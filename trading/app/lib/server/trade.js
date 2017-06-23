trade = function () {
    this.o = new oanda();
    var self = this;
    self.balance = 0;
    self.erroStatus = false;
    self.tradeCount = 0;
    self.isNotComplete = true;
    self.openTradesData = [];
    self.isReadyOpenTrades = false;
};

trade.prototype.prepare = function (data) {
    console.log('server: prepare trade');
    var d = {
        'updatedAt': new Date(),
        'instrument': data['instrument'],
        'side': data['side'],
        'leverage': data['leverage'],
        'unitPercent': data['unitPercent'],
        'riskPercent': data['riskPercent'],
        'takeProfit': data['takeProfit'],
        'stoploss': data['stoploss'],
        'spread': data['spread']
    };
    console.log(data);
    co.pmo.update({'instrument': data['instrument']}, {'$set': d}, {upsert: true});
};
trade.prototype.openTradeSteps = function (callback) {
    var self = this;
    this.o.getAccount(function (error, success) {
        //console.log(success);
        if (error) {
            self.errorStatus = true;
        }
        if (success) {
            self.balance = success['balance'];
            callback();
        }

    });
};

trade.prototype.openTrade = function (side) {
    //side = 'sell';
    console.log('server: open trade');

    /* get balance */
    var balance = 0,
        price = 0,
        tradeCount = 0,
        self = this,
        stoplossPrice = 0,
        takeProfitPrice = 0;
    self.errorStatus = false;

    /* get market order */

    var p = co.pmo.find({}, {sort: {updatedAt: -1}, limit: 1}).fetch();
    var instrument = p[0]['instrument'],
        riskPercent = p[0]['riskPercent'] * 0.01,
        unitPercent = p[0]['unitPercent'] * 0.01,
        takeProfit = p[0]['takeProfit'] * 0.0001,
        stoploss = p[0]['stoploss'] * 0.0001,
        leverage = p[0]['leverage'],
        enableTakeProfitMargin = p[0]['enableTakeProfitMargin'],
        spread = p[0]['spread'],
        takeProfitMinimum = p[0]['takeProfitMinimum'],
        trailPips = p[0]['trailPips'];

    /* get ticks for price */
    var tick = co.ticks.find({'instrument': instrument}).fetch();
    var bid = tick[0]['bid'],
        ask = tick[0]['ask'],
        openBidPrice = tick[0]['openBid'],
        openAskPrice = tick[0]['openAsk'],
        openPrice = tick[0]['openPrice'];
    if ((ask - bid) * 10000 > spread) {
        console.log('Error: Spread max');
        self.errorStatus = true;
    }
    var trades = co.trades.find({}).fetch();
    if(trades.length > 5)
    {
        console.log('Error: Already trade');
        self.errorStatus = true;
    }
    if (self.errorStatus === false) {
        self.openTradeSteps(function () {
            console.log('openTradeSteps is complete');
            balance = self.balance;
            tradeCount = self.tradeCount;
            console.log("Final Balance: " + balance);
            console.log("Trade Count " + tradeCount);

            if (tradeCount === 0 && self.errorStatus === false) {
                console.log('trading...');
                if (side === 'sell') {
                    //sell
                    //DONE FOR LIMIT AND MARKET
                    price = bid;
                    console.log('price (sell): ' + price);
                    /* calculate stoploss & take profit price */
                    stoplossPrice = price + stoploss;
                    takeProfitPrice = price - takeProfit;
                } else {
                    //buy
                    //DONE FOR LIMIT AND MARKET
                    price = ask;
                    console.log('price (buy): ' + price);
                    stoplossPrice = price - stoploss;
                    takeProfitPrice = price + takeProfit;
                }

                /* calculate */
                if(stoploss < 0)
                {
                    console.log("ERROR: Stoploss is negative. Trade is halt.");
                    self.isReadyOpenTrades = true;
                    self.errorStatus = true;
                }
                if(instrument === 'USD_CAD')
                {
                    price = 1/price;
                }
                var units = (balance * leverage * unitPercent) / price; //done
                console.log(units);
                //risk calculation
                var unitP = (riskPercent / ((units * stoploss) / balance)) > 1 ? 1 : (riskPercent / ((units * stoploss) / balance));
                var actualRiskPercent = ((unitP * units * stoploss) / balance);
                console.log('Risk Percent: ' + riskPercent);
                console.log('Actual Risk Percent: ' + actualRiskPercent);
                console.log('stoploss: ' + stoploss);
                console.log('balance: ' + balance);
                console.log('unit P : ' + unitP);
                var actualUnits = Math.round(units * unitP);
                console.log('units: ' + units);
                console.log('actual units: ' + actualUnits);
                var type = 'market';

                //require units, instrument, takeProfit, stoploss
                var order;
                    order = {
                        'instrument': instrument,
                        'units': actualUnits,
                        'side': side,
                        'type': type,
                        'stopLoss': stoplossPrice,
                        'takeProfit': takeProfitPrice
                    };

                console.log(order);
                if(self.errorStatus === false)
                {
                    self.o.createOrder(order, function (error, success) {
                        if (error) {
                            console.log(error);
                            self.isReadyOpenTrades = true;
                            self.errorStatus = true;
                        }
                        if (success) {
                            self.o.getOpenTrades(function (error, success) {
                                if (error) {
                                    console.log(error);
                                    self.errorStatus = true;
                                    self.isReadyOpenTrades = true;
                                    //Fix this if fail get open trades
                                }
                                if (success) {
                                    console.log('open trades');
                                    self.isReadyOpenTrades = true;
                                    self.openTradesData = success;
                                }
                            });
                        }
                    });
                }
            } else {
                console.log("Server error: Can't create a new trade because there is already trade.");
                self.isReadyOpenTrades = true;
                self.errorStatus = true;
            }

        });
        if(self.errorStatus  != true)
        {
            self.updateTrades();
        }

    }
};

trade.prototype.updateTrades = function () {
   // console.log('updateTrades 3');
    var self = this;
    var p;
    var trades = self.openTradesData;

   // console.log(self.openTradesData.length);
   // console.log(self.isNotComplete);
    //console.log(self.isReadyOpenTrades);
   // console.log(self.openTradesData);
    if (typeof self.openTradesData !== 'undefined' && self.openTradesData.length > 0 && self.isNotComplete === true && self.isReadyOpenTrades === true) {
        console.log('preparing to insert');
        self.isNotComplete = false;
        co.trades.remove({});
        var tradeCount = self.openTradesData.length;
        for (var x = 0; x < tradeCount; x++) {
            /*
             [ { id: 10481762345,
             I20161024-11:35:30.748(-7)?     units: 3,
             I20161024-11:35:30.749(-7)?     side: 'buy',
             I20161024-11:35:30.751(-7)?     instrument: 'GBP_USD',
             I20161024-11:35:30.752(-7)?     time: '2016-10-24T18:35:30.000000Z',
             I20161024-11:35:30.752(-7)?     price: 1.22249,
             I20161024-11:35:30.752(-7)?     takeProfit: 1.22999,
             I20161024-11:35:30.753(-7)?     stopLoss: 1.21999,
             I20161024-11:35:30.753(-7)?     trailingStop: 0,
             I20161024-11:35:30.754(-7)?     trailingAmount: 0 } ]

             */
            console.log('inserted');
            p = {
                'tradeId' : self.openTradesData[x]['id'],
                'instrument' : self.openTradesData[x]['instrument'],
                'units' : self.openTradesData[x]['units'],
                'time' : self.openTradesData[x]['time'],
                'side' : self.openTradesData[x]['side'],
                'price' : self.openTradesData[x]['price'],
                'takeProfit' : self.openTradesData[x]['takeProfit'],
                'stoploss' : self.openTradesData[x]['stopLoss']
            };
            console.log(p);
            co.trades.insert(p);
        }
    } else {
        if (self.isReadyOpenTrades === true) {
            console.log('done');
        } else {
            Meteor._sleepForMs(500);
            self.updateTrades();
        }

    }
};

trade.prototype.closeTrade = function (callback) {
    console.log('server: close trade');
    var errorStatus = false;
    var tradeId;
    var openTradeCount = 0;
    var openTrades = [];
    var self = this;
    self.o.getOpenTrades(function (error, success) {
        console.log(success);
        if (error) {
            errorStatus = true;
        }
        if (success) {
            openTradeCount = success.length;
            openTrades = success;
            for (var x = 0; x < openTradeCount; x++) {
                tradeId = openTrades[x]['id'];
                self.o.closeTrade(tradeId, function (error, success) {
                    if (error) {
                        callback(error, null);
                    }

                    if (success) {
                        callback(null, success);
                    }
                });
            }
        }
    });
    co.trades.remove({});
};