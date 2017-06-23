oanda = function(){
    this.accountId = account_id;
    this.access_token = access_token;
    console.log("Oanda API runs for "+account_id);
    OANDAAdapter = Meteor.npmRequire('oanda-adapter');
    this._oclient = new OANDAAdapter({
        // 'live', 'practice' or 'sandbox'
        environment: _account_type,
        // Generate your API access in the 'Manage API Access' section of 'My Account' on OANDA's website
        accessToken: access_token
    });
};
oanda.prototype.getCandles = function(symbol, start, end, granularity, callback){
    var self = this;
  self._oclient.getCandles(symbol, start, end, granularity, function(error, success){
      callback(error, success);
  })
};
oanda.prototype.subscribeEvents = function(callback){
    var self = this;
  self._oclient.subscribeEvents(function(event){
      callback(event);
  })
};
oanda.prototype.getPrice = function(instrument, callback){
    var self = this;
  self._oclient.getPrice(instrument, function(error, success){
      callback(error, success);
  });
};
oanda.prototype.getInstruments = function(callback){
    var self = this;
  self._oclient.getInstruments(this.accountId, function(error, success){
      callback(error, success);
  });
};
oanda.prototype.createOrder = function(order, callback){
    var self = this;
    self._oclient.createOrder(this.accountId, order, function(error, confirmation){
        callback(error, confirmation);
    });
};

oanda.prototype.getOpenTrades = function(callback){
    var self = this;
    self._oclient.getOpenTrades(this.accountId, function(error, trades){
        callback(error, trades);
    });
};

oanda.prototype.getOpenPositions = function(callback){
    var self = this;
    self._oclient.getOpenPositions(this.accountId, function(error, trades){
        callback(error, trades);
    });
};

oanda.prototype.closeTrade = function(tradeId, callback){
    var self = this;
    self._oclient.closeTrade(this.accountId, tradeId, function(error, confirmation){
        callback(error, confirmation);
    });
};

oanda.prototype.getAccount = function(callback){
    var self = this;
    self._oclient.getAccount(this.accountId, function(error, account){
        callback(error, account);
    })
};