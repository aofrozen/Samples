/**
 * Created by aofrozen on 10/14/2016.
 */
ticks = function(){

};

ticks.prototype.tick = function(data){
    /*
        Check prepare market order for chosen pair
     */
    /*
     var bid = JSONData.tick['bid'];
     var ask = JSONData.tick['ask'];

     If buy side then get ask price and close trade to accept  bid [close]
     If sell side then get bid price and close trade to accept ask ['close]
     */
    var t = co.ticks.find({'instrument' : data.instrument}).fetch();
    var highBid, lowBid, highAsk, lowAsk, highBidDate, lowBidDate, lowAskDate, highAskDate;
    var bidDate = new Date();
    var askDate = new Date();
    if(t.length === 0 || t[0]['askDate'] > askDate || t[0]['bidDate'] > bidDate) //askDate is checked if it is expired day
    {
        /*
        Reset
         */
        highBid = 0;
        highBidDate = new Date();
        lowBid = 9999;
        lowBidDate = new Date();
        highAsk = 0;
        highAskDate = new Date();
        lowAsk = 9999;
        lowAskDate = new Date();

    }else{
        /*
        Update
         */
        if(data['bid'] > t[0]['highBid'] || typeof t[0]['highBid'] === 'undefined')
        {
            highBid = data['bid'];
            highBidDate = new Date();
        }else{
            highBid = t[0]['highBid'];
            highBidDate = t[0]['HBDate'];
        }
        if(data['bid'] < t[0]['lowBid'] || typeof t[0]['lowBid'] === 'undefined')
        {
            lowBid = data['bid'];
            lowBidDate = new Date();
        }else{
            lowBid = t[0]['lowBid'];
            lowBidDate = t[0]['LBDate'];
        }

        if(data['ask'] > t[0]['highAsk'] || typeof t[0]['highAsk'] === 'undefined')
        {
            highAsk = data['ask'];
            highAskDate = new Date();
        }else{
            highAsk = t[0]['highAsk'];
            highAskDate = t[0]['HADate'];
        }
        if(data['ask'] < t[0]['lowAsk'] || typeof t[0]['lowAsk'] === 'undefined')
        {
            lowAsk = data['ask'];
            lowAskDate = new Date();
        }else{
            lowAsk = t[0]['lowAsk'];
            lowAskDate = t[0]['LADate'];
        }
    }

    d = {
        'instrument' : data['instrument'],
        'bid' : data['bid'],
        'BDate' : bidDate,
        'highBid' : highBid,
        'HBDate' : highBidDate,
        'lowBid' : lowBid,
        'LBDate' : lowBidDate,
        'ask' : data['ask'],
        'ADate' : askDate,
        'highAsk' : highAsk,
        'HADate' : highAskDate,
        'lowAsk' : lowAsk,
        'LADate' : lowAskDate
    };
    co.ticks.update({'instrument' : data.instrument}, {'$set' : d}, {'upsert' : true});
};

ticks.prototype.updateOpen = function(instrument, data){
    var d = {
        'updatedAt' : new Date(),
        'openBid' : data.openBid,
        'OBDate' : new Date(data.time*0.001),
        'openAsk' : data.openAsk,
        'OADate' : new Date(data.time*0.001),
        'highBid' : data.highBid,
        'HBDate' : new Date(data.time*0.001),
        'highAsk' : data.highAsk,
        'HADate' : new Date(data.time*0.001),
        'lowBid' : data.lowBid,
        'LBDate' : new Date(data.time*0.001),
        'lowAsk' : data.lowAsk,
        'LADate' : new Date(data.time*0.001)
    };
   // console.log(d);
    console.log('updated open');
    co.ticks.update({'instrument' : instrument}, {'$set' : d}, {'upsert' : true});
};

ticks.prototype.updateOpenPrice = function(instrument, openPrice){
    co.ticks.update({'instrument' : instrument}, {'$set' : {'openPrice' : openPrice}});
};

ticks.prototype.updateLowHigh = function(instrument, low, high){
    console.log(low);
    console.log(high);
    if(typeof high !== 'undefined' && typeof low !== 'undefined')
    {
        var d = {
            'updatedAt' : new Date(),
            'highBid' : high['highBid'],
            'HBDate' : new Date(high['time']*0.001),
            'highAsk' : high['highAsk'],
            'HADate' : new Date(high['time']*0.001),
            'lowBid' : low['lowBid'],
            'LBDate' : new Date(low['time']*0.001),
            'lowAsk' : low['lowAsk'],
            'LADate' : new Date(low['time']*0.001)
        };

        co.ticks.update({'instrument' : instrument}, {'$set' : d}, {'upsert' : true});
    }else{
        console.log('HL SKIPPED');
    }
};