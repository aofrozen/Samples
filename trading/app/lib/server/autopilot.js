/*
    Tasks
    1. Add chart to show slope line and current price
    2. Complete stoploss
    3. Add stoploss side
 */

autopilot = function(){
    var self = this;
    self.autopilotData = null;
    self.tickLastUpdate = new Date();
    self.trade = new trade();
};

autopilot.prototype.save = function(data){
    /*
     createdAt : {
     type: Date
     },
     instrument : {
     type: String
     },
     startUpperPrice : {
     type: Number,
     optional: true
     },
     endUpperPrice : {
     type: Number,
     optional: true
     },
     startLowerPrice : {
     type: Number,
     optional: true
     },
     endLowerPrice : {
     type: Number,
     optional: true
     },
     side : {
     type: String,  //Sell and Buy
     optional: true
     },
     profitAction: {
     type: String, //Trade, Close or Free
     optional: true
     },
     openTrade : {
     type: Boolean, //is it still open trade or not?
     optional: true
     }
     */
    co.autopilot.update({'instrument' : data.instrument}, {$set: data}, {upsert:true});
};

autopilot.prototype.toggle = function(data){
    co.autopilot.update({'instrument' : data.instrument}, {$set: {isRun : data.isRun}});
};

autopilot.prototype.get = function(instrument){
    console.log("looking for instrument is :"+instrument);
    return co.autopilot.findOne({'instrument' : instrument});
};

autopilot.prototype.calculate = function(data){
    /*
    Calculate
    Start timestamp, distance (duration)

    Return
    stoploss price, takeprofit price, open trade price
     */
    //console.log(data);
    if(typeof data === 'undefined' || data === null)
        return {};
    var stoplossPrice = 0;
    var duration = (data.endDate.getTime() - data.startDate.getTime())/1000;
    var upperHeightPips = data.endUpperPrice - data.startUpperPrice;
    var lowerHeightPips = data.endLowerPrice - data.startLowerPrice;
    var upperSlope = upperHeightPips/duration;
    var lowerSlope = lowerHeightPips/duration;
    console.log('Upper Slope: '+upperSlope);
   console.log('Lower Slope: '+lowerSlope);
    var upperPips = upperSlope * ((new Date().getTime() - data.startDate.getTime())/1000);
    var lowerPips = lowerSlope * ((new Date().getTime() - data.startDate.getTime())/1000);
    console.log('Upper Pips: '+upperPips);
    console.log('Lower Pips: '+lowerPips);
    var upperPrice = data.startUpperPrice + upperPips;
    var lowerPrice = data.startLowerPrice + lowerPips;
    console.log('Upper Price: '+upperPrice);
    console.log('Lower Price: '+lowerPrice);
    if(upperPips >= 0)
    {
        stoplossPrice = lowerPrice - data.stoplossMarginPips * 0.0001;
    }else{
        stoplossPrice = upperPrice + data.stoplossMarginPips * 0.0001;
    }

    console.log('Stoploss Price: '+stoplossPrice);
    d = {
      upperSlope : upperSlope,
        lowerSlope : lowerSlope,
        upperPips : upperPips,
        lowerPips : lowerPips,
        upperPrice : upperPrice,
        lowerPrice : lowerPrice,
        stoplossPrice : stoplossPrice
    };
    //console.log(d);
    return d;
    /*
    If sell then reverse. If buy then not reverse. They are ensured to stay positive number.
     */
};

autopilot.prototype.tick = function(tick){
    var ask = tick['ask'];
    var bid = tick['bid'];
    var instrument = tick['instrument'];
    console.log('autopilot tick');
    var self = this;
    //console.log(autopilotChange);
    if(self.autopilotData == null || autopilotChange)
    {
        self.autopilotData = self.get(instrument);
        autopilotChange = false;
        //console.log(self.autopilotData);
    }
    if(typeof self.autopilotData === 'undefined')
        return null;
    if(self.autopilotData['isRun'] === true)
    {
        console.log('autopilot is running');
        var rules = self.calculate(self.autopilotData);
        console.log(self.autopilotData['side']);
        if(self.autopilotData['side'] === 'sell')
        {
            if(self.autopilotData['openTrade'] === false)
            {
                console.log('sell');
                if(bid >= rules['upperPrice'])
                {
                    console.log(bid + ' >= '+rules['upperPrice']);
                    //self.trade.openTrade('sell');
                    self.setOpenTrade(instrument);
                    self.autopilotData['openTrade'] = true;
                }
            }else{
                console.log('current open trade');
                if(bid <= rules['lowerPrice'])
                {
                    switch(self.autopilotData['profitAction'])
                    {
                        case 'Close':
                            console.log('Close');
                            /*self.trade.closeTrade(function(error, success){
                                self.setCloseTrade(instrument);
                                self.autopilotData['openTrade'] = false;
                            });*/

                            break;
                        case 'Free' :
                            console.log('Free');
                            break;
                    }
                }else if(ask >= rules['stoplossPrice']){
                    console.log('stoploss is touched');
                    self.setCloseTrade(instrument);
                    self.setRun(instrument, false);
                    self.autopilotData.isRun = false;
                    self.autopilotData.openTrade = false;
                }
            }
        }else if(self.autopilotData['side'] === 'buy'){
            if(self.autopilotData['openTrade'] === false)
            {
                console.log('buy checking');
                console.log('Diff: '+((ask - rules['lowerPrice'])*10000));
                if(ask <= rules['lowerPrice'])
                {
                    //self.trade.openTrade('buy');
                    console.log('bought');
                    self.setOpenTrade(instrument);
                    self.autopilotData['openTrade'] = true;
                }
            }else{
                console.log('current open trade');
                if(ask >= rules['upperPrice'])
                {

                    switch(self.autopilotData['profitAction'])
                    {
                        case 'Close':
                            console.log('Close');
                           /* self.trade.closeTrade(function(error, success){
                                self.setCloseTrade(instrument);
                                self.autopilotData['openTrade'] = false;
                            });*/
                            break;
                        case 'Free' :
                            console.log('Free');
                            break;
                    }
                }else if(ask <= rules['stoplossPrice']){
                    console.log('stoploss is touched');
                    self.setCloseTrade(instrument);
                    self.setRun(instrument, false);
                    self.autopilotData.isRun = false;
                    self.autopilotData.openTrade = false;
                }
            }
        }

        /*
         else if(self.autopilotData['side'] === 'Buy'){
         console.log('Buy');
         if(ask <= rules['lowerPrice'])
         {

         }
         }
         */
    }else{
        console.log('autopilot is not running');
    }

    //console.log(rules);

};

autopilot.prototype.setRun = function(instrument, status)
{
    console.log('setOpenTrade for '+instrument);
    co.autopilot.update({'instrument' : instrument}, {$set: {isRun : status}});
};

autopilot.prototype.setOpenTrade = function(instrument){
    console.log('setOpenTrade for '+instrument);
    co.autopilot.update({'instrument' : instrument}, {$set: {openTrade : true}});
};

autopilot.prototype.setCloseTrade = function(instrument){
    co.autopilot.update({'instrument' : instrument}, {$set: {openTrade : false}});
};