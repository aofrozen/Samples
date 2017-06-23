
function ISODateString(d) {
    function pad(n) {
        return n < 10 ? '0' + n : n
    }

    if (typeof d === 'undefined') {
        d = new Date();
    }
    return d.getUTCFullYear() + '-'
        + pad(d.getUTCMonth() + 1) + '-'
        + pad(d.getUTCDate()) + 'T'
        + pad(d.getUTCHours()) + ':'
        + pad(d.getUTCMinutes()) + ':'
        + pad(d.getUTCSeconds()) + ''
}


var timeTickDep = new Deps.Dependency();
var timeTickInterval;

function arrayExists(array, value)
{
    if(typeof array === 'undefined' || typeof array[value] === 'undefined' || array.length === 0)
        return false;
    return true
}

function timeTick() {
    timeTickDep.changed();
    return new Date();
}
Template.trade.helpers({
    'instrument': function () {
        if(arrayExists(Template.instance().getTicks(), 'instrument'))
            return Template.instance().getTicks()['instrument'];
    },
    'ticks': function () {
        return Template.instance().getTicks();
    },
    'openAsk': function () {
        if(arrayExists(Template.instance().getTicks(), 'openAsk'))
            return Template.instance().getTicks()['openAsk'];
    },
    'openBid': function () {
        if(arrayExists(Template.instance().getTicks(), 'openBid'))
            return Template.instance().getTicks()['openBid'];
    },
    'openSpread': function () {
        if(arrayExists(Template.instance().getTicks(), 'openAsk'))
            return ((Template.instance().getTicks()['openAsk'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'openTime': function () {
        timeTickDep.depend();
        if(arrayExists(Template.instance().getTicks(), 'OADate'))
            return Template.instance().getTicks()['OADate'];
    },
    'closeBid': function () {
        if(arrayExists(Template.instance().getTicks(), 'bid'))
            return ((Template.instance().getTicks()['bid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'closeAsk': function () {
        if(arrayExists(Template.instance().getTicks(), 'ask'))
            return ((Template.instance().getTicks()['ask'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'closeSpread': function () {
        if(arrayExists(Template.instance().getTicks(), 'ask'))
            return ((Template.instance().getTicks()['ask'] - Template.instance().getTicks()['bid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2)
    },
    'highSpread': function () {
        if(arrayExists(Template.instance().getTicks(), 'highAsk'))
            return ((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['highBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'highAsk': function () {
        if(arrayExists(Template.instance().getTicks(), 'highAsk'))
            return ((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'highBid': function () {
        if(arrayExists(Template.instance().getTicks(), 'highBid'))
            return ((Template.instance().getTicks()['highBid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'lowSpread': function () {
        if(arrayExists(Template.instance().getTicks(), 'lowAsk'))
            return ((Template.instance().getTicks()['lowAsk'] - Template.instance().getTicks()['lowBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'lowBid': function () {
        if(arrayExists(Template.instance().getTicks(), 'lowBid'))
            return ((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openAsk']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'lowAsk': function () {
        if(arrayExists(Template.instance().getTicks(), 'lowAsk'))
            return ((Template.instance().getTicks()['lowAsk'] - Template.instance().getTicks()['openAsk']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'closePercent': function () {
        if(arrayExists(Template.instance().getTicks(), 'highAsk'))
        {
            var H = parseFloat(((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['openAsk']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
            var L = parseFloat(((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
            if (L < 0) {
                L *= -1;
            }
            var R = ((((Template.instance().getTicks()['bid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2) / (H + L)) * 100).toFixed(2);
            // if(R < 0)
            // R *= -1;
            return R;
        }

    },
    'closeHL': function () {
        /*
         ((Now - L Price) / (H Price - L Price)) * 100

         Template.instance().getTicks()['bid']
         Template.instance().getTicks()['lowBid']
         Template.instance().getTicks()['highAsk']
         */
        if(arrayExists(Template.instance().getTicks(), 'bid'))
            return (((Template.instance().getTicks()['bid'] - Template.instance().getTicks()['lowBid']) / (Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['lowBid'])) * 100).toFixed(2);
    },
    'nowDate': function () {
        timeTickDep.depend();
        if(arrayExists(Template.instance().getTicks(), 'BDate')) {
            if (Template.instance().getSide() === 'sell') {
                return Template.instance().getTicks()['BDate'];
            } else {
                return Template.instance().getTicks()['ADate'];
            }
        }
    },
    'openHighPercent': function () {
        if(arrayExists(Template.instance().getTicks(), 'highAsk'))
        {
            var H = parseFloat(((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['openAsk']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
            var L = parseFloat(((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
            if (L < 0) {
                L *= -1;
            }
            var realHigh = (((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['openAsk']) - (Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['highBid'])) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
            return ((realHigh / (H + L)) * 100).toFixed(2);
        }

    },
    'highDate': function () {
        timeTickDep.depend();
        if(arrayExists(Template.instance().getTicks(), 'HBDate'))
        {
            if (Template.instance().getSide() === 'sell') {
                return Template.instance().getTicks()['HBDate'];
            } else {
                return Template.instance().getTicks()['HADate'];
            }
        }
    },
    'openLow': function () {
        //var realLow = (((Template.instance().getTicks()['lowBid']-Template.instance().getTicks()['openBid'])-(Template.instance().getTicks()['lowAsk']-Template.instance().getTicks()['lowBid']))*pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
        if(arrayExists(Template.instance().getTicks(), 'lowBid'))
            return ((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2) + ' B / ' + ((Template.instance().getTicks()['lowAsk'] - Template.instance().getTicks()['lowBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2) + ' S';

    },
    'openLowPercent': function () {
        var H = parseFloat(((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['openAsk']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
        var L = parseFloat(((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
        if (L < 0) {
            L *= -1;
        }
        var realLow = (((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openBid']) - (Template.instance().getTicks()['lowAsk'] - Template.instance().getTicks()['lowBid'])) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
        var R = ((realLow / (H + L)) * 100).toFixed(2);
        if (R < 0)
            R *= -1;
        return R;
    },
    'lowDate': function () {
        timeTickDep.depend();
        if(arrayExists(Template.instance().getTicks(), 'LBDate')) {
            if (Template.instance().getSide() === 'sell') {
                return Template.instance().getTicks()['LBDate'];
            } else {
                return Template.instance().getTicks()['LADate'];
            }
        }
    },
    'HL': function () {
        if(arrayExists(Template.instance().getTicks(), 'highAsk'))
        {
            var H = parseFloat(((Template.instance().getTicks()['highAsk'] - Template.instance().getTicks()['openAsk']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
            var L = parseFloat(((Template.instance().getTicks()['lowBid'] - Template.instance().getTicks()['openBid']) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2));
            if (L < 0) {
                L *= -1;
            }
            return (H + L).toFixed(2);
        }

    },
    'prepareMarketOrderData': function () {
        return Template.instance().getPrepareMarketOrder();
    },
    'instFormat': function (v) {
        return v.replace('_', '/');
    },
    'leverage': function () {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'leverage'))
            return Template.instance().getPrepareMarketOrder()['leverage'];
    },
    'unitPercent': function () {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'unitPercent'))
            return Template.instance().getPrepareMarketOrder()['unitPercent'];
    },
    'riskPercent': function () {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'riskPercent'))
        return Template.instance().getPrepareMarketOrder()['riskPercent'];
    },
    'takeProfitB': function () {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'takeProfit'))
        return Template.instance().getPrepareMarketOrder()['takeProfit'];
    },
    'stoplossB': function () {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'stoploss'))
        return Template.instance().getPrepareMarketOrder()['stoploss'];
    },
    'pipConverter': function (price, position) {
        return ((price - position) * pipConverter(Template.instance().getTicks()['instrument'])).toFixed(2);
    },
    'spread': function () {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'spread'))
        return Template.instance().getPrepareMarketOrder()['spread'];
    },
    'selectInstrument': function (value) {
        if(arrayExists(Template.instance().getPrepareMarketOrder(), 'instrument'))
        return Template.instance().getPrepareMarketOrder()['instrument'] === value;
    },
    'openTrades': function () {
        return Template.instance().getOpenTrades();
    },
    'PL': function (side, price) {
        if (side === 'sell') {
            return ((price - Template.instance().getTicks()['ask']) * 10000).toFixed(2) + ' No-Real / ' + ((price - Template.instance().getTicks()['bid']) * 10000).toFixed(2) + ' Real';
        } else {
            return ((Template.instance().getTicks()['bid'] - price) * 10000).toFixed(2) + ' No-Real / ' + ((Template.instance().getTicks()['ask'] - price) * 10000).toFixed(2) + ' Real';
        }
    },
    'tradeCount': function () {
        return Template.instance().getTradeCount();
    },
    'selectSide' : function(side){
        if(arrayExists(Template.instance().getAutoPilot(), 'side'))
            return Template.instance().getAutoPilot()['side'] === side;
    },
    'selectProfitAction' : function(profitAction){
        if(arrayExists(Template.instance().getAutoPilot(), 'profitAction'))
            return Template.instance().getAutoPilot()['profitAction'] === profitAction;
    },
    'startUpperPrice' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'startUpperPrice'))
        return Template.instance().getAutoPilot()['startUpperPrice'];
    },
    'endUpperPrice' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'endUpperPrice'))
        return Template.instance().getAutoPilot()['endUpperPrice'];
    },
    'startLowerPrice' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'startLowerPrice'))
        return Template.instance().getAutoPilot()['startLowerPrice'];
    },
    'endLowerPrice' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'endLowerPrice'))
        return Template.instance().getAutoPilot()['endLowerPrice'];
    },
    'distance' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'distance'))
        return Template.instance().getAutoPilot()['distance'];
    },
    'stoplossMarginPips' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'stoplossMarginPips'))
            return Template.instance().getAutoPilot()['stoplossMarginPips'];
    },
    'toggleAutoPilot' : function(){
        if(arrayExists(Template.instance().getAutoPilot(), 'isRun'))
            if(Template.instance().getAutoPilot()['isRun'] !== true)
            {
                return 'Disabled autopilot';
            }else{
                return 'Enabled autopilot'
            }
    },
    'startDate' : function(){
        var now;
        if(arrayExists(Template.instance().getAutoPilot(), 'startDate'))
        {
            now = Template.instance().getAutoPilot()['startDate'];
        }else{
            now = new Date();
        }
        var now = new Date(now)
            , year
            , month
            , date
            , hours
            , minutes
            , seconds
            , formattedDateTime;

        year = now.getFullYear();
        month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
        date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
        hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
        minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
        seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds();

        return year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;
    },
    'endDate' : function(){
        var now;
        if(arrayExists(Template.instance().getAutoPilot(), 'endDate'))
        {
            now = Template.instance().getAutoPilot()['endDate'];
        }else{
            now = new Date();
        }
        var now = new Date(now)
            , year
            , month
            , date
            , hours
            , minutes
            , seconds
            , formattedDateTime;

        year = now.getFullYear();
        month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
        date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
        hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
        minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
        seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds();

        return year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;
    }
});

Template.trade.events({
    'click .save-auto-pilot-btn' : function(event, template){
      console.log('clicked save auto pilot');
      var d = {
          startUpperPrice : $('.start-upper-price').val(),
          endUpperPrice : $('.end-upper-price').val(),
          startLowerPrice : $('.start-lower-price').val(),
          endLowerPrice : $('.end-lower-price').val(),
          side : $("input[type='radio'][name='side']:checked").val(),
          profitAction : $('.profit-action option:selected').val(),
          instrument : template.getTicks()['instrument'],
          stoplossMarginPips: $('.stoploss-margin-pips').val(),
          startDate : new Date($('.start-date').val()),
          endDate : new Date($('.end-date').val())

      };
      console.log(d);
      Meteor.call('saveAutoPilot', d, function(error, success){

      });
    },
    'click .reset-auto-pilot-btn' : function(event, template){
        console.log('clicked reset auto pilot');
        var d = {
            startUpperPrice : $('.start-upper-price').val(),
            endUpperPrice : $('.end-upper-price').val(),
            startLowerPrice : $('.start-lower-price').val(),
            endLowerPrice : $('.end-lower-price').val(),
            side : $("input[type='radio'][name='side']:checked").val(),
            profitAction : $('.profit-action option:selected').val(),
            instrument : template.getTicks()['instrument'],
            stoplossMarginPips: $('.stoploss-margin-pips').val(),
            startDate : new Date($('.start-date').val()),
            endDate : new Date($('.end-date').val()),
            isRun : false,
            openTrade : false
        };
        console.log(d);
        Meteor.call('resetAutoPilot', d, function(error, success){

        })  ;
    },
    'click .toggle-auto-pilot-btn' : function(event, template){
        var d = template.getAutoPilot();
      Meteor.call('toggleAutoPilot', d, function(error, success){

      });
    },
    'change .instrument': function (event, template) {
        console.log('changed!');
        var instrument = $('.instrument').val();
        console.log(instrument);
        template.instrument.set(instrument);
    },
    'click .prepare-market-order-btn': function (event, template) {
        $('#market-order-modal').modal('show');
        $('#market-order-modal').on('shown.bs.modal', function (e) {
            console.log('ready');
            console.log(ISODateString(template.getPrepareMarketOrder()['endSchedule']));
            $(".startSchedule").val(ISODateString(template.getPrepareMarketOrder()['startSchedule']));
            $(".endSchedule").val(ISODateString(template.getPrepareMarketOrder()['endSchedule']));
        });
    },
    'click .save-premarket-order-btn': function () {
        var d = {
            instrument: $('.instrument').val(),
            side: $('.side').val(),
            leverage: $('.leverage').val(),
            unitPercent: $('.unitPercent').val(),
            riskPercent: $('.riskPercent').val(),
            takeProfit: $('.takeProfit').val(),
            stoploss: $('.stoploss').val(),
            limit: $('.limit').val(),
            spread: $('.spread').val(),
            startSchedule: $('.startSchedule').val(),
            endSchedule: $('.endSchedule').val(),
            enableTakeProfitMargin: $('.enableTpMargin').is(':checked'),
            takeProfitMinimum: $('.takeProfitMin').val(),
            trailPips: $('.trailPips').val(),
            enableTrail: $('.enableTrail').is(':checked')
        };
        Meteor.call('prepareMarketOrder', d, function (error, success) {
            $('#market-order-modal').modal('hide');
            if (success) {
                sAlert.success(success, {timeout: 2000});
            }
        });
    },
    'click .confirm-sell-trade-btn': function (event, template) {
        $('#sell-confirmation-modal').modal('show');
    },
    'click .confirm-buy-trade-btn': function (event, template) {
        $('#buy-confirmation-modal').modal('show');
    },
    'click .sell-trade-btn': function (event, template) {
        if (template.getTradeCount() < 2500) {
            $('.open-sell-trade-btn').attr('disabled', 'disabled');
            Meteor.call('openTrade', 'sell', function (error, success) {
                $('#sell-confirmation-modal').modal('hide');
                $('.open-sell-trade-btn').removeAttr('disabled');
                if (success) {
                    sAlert.success('You open trade successfully.', {timeout: 2000});
                }
                if (error) {
                    sAlert.error(error, {timeout: 2000});
                }

            });
        } else {
            sAlert.error('Trade is disabled due to exceed trade quota limit.', {timeout: 2000});
        }
    },
    'click .buy-trade-btn': function (event, template) {
        if (template.getTradeCount() < 2500) {
            $('.open-sell-trade-btn').attr('disabled', 'disabled');

            Meteor.call('openTrade', 'buy', function (error, success) {
                $('.open-buy-trade-btn').removeAttr('disabled');
                $('#buy-confirmation-modal').modal('hide');
                if (success) {
                    sAlert.success('You open trade successfully.', {timeout: 2000});
                }
                if (error) {
                    sAlert.error(error, {timeout: 2000});
                }
            });
        } else {
            sAlert.error('Trade is disabled due to exceed trade quota limit.', {timeout: 2000});
        }

    },
    'click .confirm-close-all-trades-btn': function () {
        $('#close-all-trades-confirmation-modal').modal('show');
    },
    'click .close-all-trades-btn': function () {

            $('.close-all-trades-btn').attr('disabled', 'disabled');
            Meteor.call('closeTrade', function (error, success) {
                $('#close-all-trades-confirmation-modal').modal('hide');
                console.log(success);
                console.log(error);
                $('.close-all-trades-btn').removeAttr('disabled');
                $('#buy-confirmation-modal').modal('hide');
                if (success) {
                    sAlert.success(success, {timeout: 2000});
                }
                if (error) {
                    sAlert.error(error, {timeout: 2000});
                }
            });


    }
});

Template.trade.onCreated(function () {
    // instance.probabilityData = new ReactiveVar({});
    this.analyzedData = new ReactiveVar([]);
    this.probabilityData = new ReactiveVar([]);
    this.loading = new ReactiveVar(false);
    this.instrument = new ReactiveVar();
    this.autopilot = new ReactiveVar([]);
    var self = this;
    timeTick();
    timeTickInterval = Meteor.setInterval(timeTick, 1000);
    var instance = this;
    instance.autorun(function () {
        Meteor.subscribe('ticks');
        Meteor.subscribe('prepareMarketOrder', self.instrument.get());
        var pmo = co.pmo.findOne({}, {sort: {updatedAt: -1}});
        Meteor.subscribe('openTrades');
        Meteor.subscribe('autopilot');
        var t = new Date();
        var y = new Date(t);
        //console.log(success);
        t.setUTCHours(21, 0, 0, 0); //It is standard forex time
        if (t.getTime() > y.getTime()) {
            //Get yesterday
            t.setDate(t.getDate() - 1);
        }
        Meteor.subscribe('transactions');
        instance.getTradeCount = function () {
            return co.transactions.find({time: {'$gt': t}, type: 'TRADE_CLOSE'}, {sort: {time: -1}}).fetch().length;
        };
        instance.getSide = function () {
            var r = co.pmo.findOne({});
            if (typeof r !== 'undefined') {
                return r['side'];
            } else {
                return 'ask';
            }
        };
        instance.getAutoPilot = function(){
            var p = co.pmo.findOne({}, {sort: {updatedAt: -1}});
            if(typeof p !== 'undefined')
                return co.autopilot.findOne({'instrument' : p['instrument']});
        };
        instance.getTicks = function () {
            var p = co.pmo.findOne({}, {sort: {updatedAt: -1}});
            if (typeof p !== 'undefined') {
                return co.ticks.findOne({'instrument': p['instrument']});
            }
        };
        instance.getPrepareMarketOrder = function () {
            if (typeof self.instrument.get() === 'undefined') {
                return co.pmo.findOne({}, {sort: {updatedAt: -1}});
            } else {
                return co.pmo.findOne({'instrument': self.instrument.get()}, {sort: {updatedAt: -1}});
            }

        };
        instance.getOpenTrades = function () {
            return co.trades.find({});
        };
        //updateSlopeChart(instance.getAutoPilot(), instance.getTicks());
    });
});


calculateAutopilot = function(data){
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
    //console.log('Upper Slope: '+upperSlope);
    //console.log('Lower Slope: '+lowerSlope);
    var upperPips = upperSlope * ((new Date().getTime() - data.startDate.getTime())/1000);
    var lowerPips = lowerSlope * ((new Date().getTime() - data.startDate.getTime())/1000);
    //console.log('Upper Pips: '+upperPips);
    //console.log('Lower Pips: '+lowerPips);
    var upperPrice = data.startUpperPrice + upperPips;
    var lowerPrice = data.startLowerPrice + lowerPips;
    // console.log('Upper Price: '+upperPrice);
    // console.log('Lower Price: '+lowerPrice);
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

function updateSlopeChart(data, ticks){
    var rules = calculateAutopilot(data);
    console.log(rules);
    console.log(ticks);
    var upper = [];
    var lower = [];
    var labels = [];
    if(typeof ticks !== 'undefined')
    {
        for(var x = 0;x < 10;x++){
            labels.push(x);
            upper.push((ticks['openAsk'] + (rules['upperSlope']*x*60*60)).toFixed(5));
            lower.push((ticks['openAsk'] + (rules['lowerSlope']*x*60*60)).toFixed(5));
        }
        console.log(ticks['openAsk']);
        new Chartist.Line('.slope-chart', {
            labels: labels,
            series: [[null, ticks['openAsk']], upper, lower]
        }, {
            showPoint: true,
            stretch: true
        });
    }
}

Template.trade.destroyed = function () {
    Meteor.clearInterval(timeTickInterval);
};
Template.trade.onRendered(function () {

});