Template.game.helpers({
    'isLoading': function () {
        return Template.instance().loading.get();
    },
    'analyzedData': function () {
        var a = Template.instance().analyzedData.get();
        var aa = [];
        console.log(Template.instance().position.get());
        aa.push(a[Template.instance().position.get()]);
        return aa;
    },
    'formatPips': function (pip, cPip, maxPip, color) {
        pip = parseFloat(pip);
        if (maxPip !== false) {
            maxPip = parseFloat(maxPip);
            if (cPip !== false) {
                cPip = parseFloat(cPip);
                if (pip > cPip) {
                    return "<span style='color:" + color + ";font-weight:bold;'>" + pip + " pip (" + ((pip / maxPip) * 100).toFixed(2) + "%)</span>";
                } else {
                    return "<span>" + pip + " pip (" + ((pip / maxPip) * 100).toFixed(2) + "%)</span>";
                }
            } else {
                if (pip > 0) {
                    return "<span style='color:green;font-weight:bold'>" + pip + " pip (" + ((pip / maxPip) * 100).toFixed(2) + "%)</span>";
                } else {
                    return "<span style='color:red;font-weight:bold'>" + pip + " pip (" + ((pip / maxPip) * 100).toFixed(2) + "%)</span>";
                }
            }
        } else {
            if (cPip !== false) {
                cPip = parseFloat(cPip);
                if (pip > cPip) {
                    return "<span style='color:" + color + ";font-weight:bold'>" + pip + " pip</span>";
                } else {
                    return "<span>" + pip + " pip</span>";
                }
            } else {
                if (pip > 0) {
                    return "<span style='color:green;font-weight:bold'>" + pip + " pip</span>";
                } else {
                    return "<span style='color:red;font-weight:bold'>" + pip + " pip</span>";
                }
            }

        }
    },
    'setLoading': function (index) {
        //console.log(index);
        if ((index + 1) >= 210) //Template.instance().analyzedData.get().length
        {
            console.log("COMPLETE!");
            Template.instance().loading.set(false);
        }
    },
    'HLOrderFilter' : function(direction, hlOrder){
        if(direction === 'high')
        {
            if(hlOrder === 'HL')
            {
                return ' First';
            }else{
                return ' Last';
            }
        }
        if(direction === 'low')
        {
            if(hlOrder === 'HL')
            {
                return ' Last';
            }else{
                return ' First';
            }
        }
    },
    'dataExists' : function(){
        return Template.instance().analyzedData.get().length > 0;
    },
    'leverage' : function(){
        return Template.instance().leverage.get();
    },
    'balance' : function(){
        return Template.instance().balance.get();
    },
    'riskPercent' : function(){
        return Template.instance().riskPercent.get();
    },
    'unitPercent' : function(){
        return Template.instance().unitPercent.get();
    },
    'limit' : function(){
        return Template.instance().limit.get();
    },
    'takeProfit' : function(){
        return Template.instance().takeProfit.get();
    },
    'stoploss' : function(){
        return Template.instance().stoploss.get();
    }
});

setTradeOptions = function(template){
    template.takeProfit.set($('.takeProfit').val());
    template.stoploss.set($('.stoploss').val());
    template.limit.set($('.limit').val());
    template.unitPercent.set($('.unitPercent').val());
    template.leverage.set($('.leverage').val());
    template.riskPercent.set($('.riskPercent').val());
};

/*
Calculate trade

TP, SL, Limit, Risk Percent, Unit Percent, Leverage, Balance, and Currency Pair are required value.


 */

calculateTrade = function(orderType, template)
{
    /*
    This calculation is strictly using only TP/SL margin due to this is more efficient than no SL/TP margin for CSV.

    Two types of SL/TP:

    #1
    Limit + Stoploss = Increased stoploss.

    #2
    Stoploss - Limit = Decreased stoploss.
     */
    var takeProfit = parseFloat(template.takeProfit.get());
    var stoploss = parseFloat(template.stoploss.get());
    var limit = parseFloat(template.limit.get());
    var unitPercent = parseFloat(template.unitPercent.get()*0.01);
    var leverage = parseFloat(template.leverage.get());
    var riskPercent = parseFloat(template.riskPercent.get()*0.01);
    var balance = parseFloat(template.balance.get());

    var analyzedData = template.analyzedData.get();
    var position = template.position.get();
    var data = analyzedData[position];
    var HLOrder = data['HLOrder']['HLOrder'];
    var localPip = data['HLOrder']['localPips'];
    var openPrice = data['openPrice'];
    var openHighPip = data['openHighPip'];
    var openLowPip = data['openLowPip'];
    var openClosePip = data['openClosePip'];
    console.log('openClose is '+openClosePip);
    console.log(data);
    var PLPips = 0;
    var spread = template.spread.get();
    var marginType = 'nofixed';
    var stoplossTotal = 0;
    var actualRiskPercent = 0;
        /*
    Calculate for units...
     */
    var units = (balance * leverage * unitPercent) / openPrice; //done

    if(marginType !== 'fixed')
    {
        stoplossTotal = (stoploss)*0.0001;
    }else{
        stoplossTotal = (stoploss - limit)*0.0001;
    }


    //risk calculation
    var unitP = (riskPercent / ((units * stoplossTotal) / balance)) > 1 ? 1 : (riskPercent / ((units * stoplossTotal) / balance));
    var actualRiskPercent = ((unitP * units * stoplossTotal) / balance);
    var actualUnits = Math.round(units * unitP);
    /*
    Calculate PL
     */
    if(HLOrder === 'Low')
    {
        console.log('First low and last high');
        if(orderType === 'sell' && limit <= openHighPip)
        {
            console.log('sell');
            if(marginType !== 'fixed')
            {
                //Sell
                if(localPip >= (stoploss+limit)) //check local pip due to first low
                {
                    //touched stoploss to loss
                    PLPips = stoploss*-1;
                }else if(takeProfit <= (limit + openLowPip)){
                    PLPips = takeProfit;
                }else if(openHighPip >= (stoploss+limit)){
                    PLPips = stoploss*-1;
                }else{
                    //not touch takeprofit and stoploss either then last is open-close for PL
                    PLPips = openClosePip*-1;
                }
            }else{
                //Sell
                if(localPip >= stoploss) //check local pip due to first low
                {
                    //touched stoploss to loss
                    PLPips = (stoploss - limit)*-1;
                }else if(takeProfit <= (limit + openLowPip)){
                    PLPips = takeProfit;
                }else if(openHighPip >= stoploss){
                    PLPips = (stoploss - limit)*-1;
                }else{
                    //not touch takeprofit and stoploss either then last is open-close for PL
                    PLPips = openClosePip*-1;
                }
            }

        }else if(orderType === 'buy' && limit <= openLowPip){
            //Buy
            console.log('buy');
            if(marginType !== 'fixed')
            {
                if(openLowPip >= (stoploss+limit))
                {
                    console.log('stoploss is '+stoploss);
                    PLPips = stoploss*-1;
                }else if(takeProfit <= (limit + openHighPip)){
                    PLPips = takeProfit;
                }else{
                    PLPips = openClosePip;
                }
            }else{
                if(openLowPip >= stoploss)
                {
                    console.log('stoploss is '+(stoploss-limit));
                    PLPips = (stoploss-limit)*-1;
                }else if(takeProfit <= (limit + openHighPip)){
                    console.log("Take profit");
                    console.log(takeProfit + '<= ('+limit+'+'+openHighPip+')');
                    PLPips = takeProfit;
                }else{
                    PLPips = openClosePip;
                }
            }

        }
    }else if(HLOrder === 'High'){
        console.log('First high and last low');
        if(orderType === 'sell'  && limit <= openHighPip)
        {
            console.log('sell');
            if(marginType !== 'fixed')
            {
                //Sell
                if(openHighPip >= (stoploss + limit)) //check local pip due to first low
                {
                    //touched stoploss to loss
                    console.log('stoploss w is '+stoploss);
                    PLPips = stoploss*-1;
                }else if(takeProfit <= (limit + openLowPip)){
                    PLPips = takeProfit;
                }else{
                    //not touch takeprofit and stoploss either then last is open-close for PL
                    PLPips = openClosePip*-1;
                }
            }else{
                //Sell
                if(openHighPip >= stoploss) //check local pip due to first low
                {
                    //touched stoploss to loss
                    console.log('stoploss e is '+(stoploss-limit));
                    PLPips = (stoploss-limit)*-1;
                }else if(takeProfit <= (limit + openLowPip)){
                    PLPips = takeProfit;
                }else{
                    //not touch takeprofit and stoploss either then last is open-close for PL
                    PLPips = openClosePip*-1;
                }
            }

        }else if(orderType === 'buy' && limit <= openLowPip){
            //Buy
            console.log('buy');
            if(marginType !== 'fixed')
            {
                if(localPip >= (stoploss+limit))
                {
                    console.log('stoploss  x is '+(stoploss));
                    PLPips = stoploss*-1;
                }else if(takeProfit <= (limit + openHighPip)){
                    PLPips = takeProfit;
                }else if(openLowPip >= (stoploss+limit)){
                    PLPips = stoploss*-1;
                }else{
                    PLPips = openClosePip;
                }
            }else{
                if(localPip >= stoploss)
                {
                    console.log('stoploss c is '+((stoploss-limit)));
                    PLPips = (stoploss-limit)*-1;
                }else if(takeProfit <= (limit + openHighPip)){
                    console.log("Take profit");
                    console.log(takeProfit + '<= ('+limit+'+'+openHighPip+')');
                    console.log(limit+openHighPip);
                    PLPips = takeProfit;
                }else if(openLowPip >= stoploss){
                    PLPips = (stoploss-limit)*-1;
                }else{
                    PLPips = openClosePip;
                }
            }
        }
    }
    console.log('calculate trade...');
    console.log(stoploss);
    console.log(limit);
    console.log(balance);
    console.log(unitP);
    console.log(leverage);
    console.log(unitPercent);
    var PL = PLPips * 0.0001 * unitP * balance * leverage * unitPercent;
    template.balance.set(balance+PL);
    console.log(PL);
    console.log(PLPips);
};

Template.game.events({
    'click .start-btn': function (event, template) {
        template.loading.set(true);
        template.balance.set($('.balance').val());
        template.spread.set($('spread').val());
        template.position.set(208);
        Meteor.call('analyze', $('.cPair').val(), $('.spread').val(), function (error, r) {
            console.log('Got all data');
            console.log(r);
            template.analyzedData.set(r['analyzedData'].reverse());
            template.probabilityData.set(r['probabilityData']);
        });
    },
    'click .skip-trade-btn' : function(event, template){
        setTradeOptions(template);
        var a = template.analyzedData.get();
        console.log(a.length);
        console.log(a[template.position.get()]);
        template.nextPos();
    },
    'click .buy-trade-btn' : function(event, template){
        template.nextPos();
        setTradeOptions(template);
        calculateTrade('buy', template);
        console.log('callback');

    },
    'click .sell-trade-btn' : function(event, template) {
        template.nextPos();
        setTradeOptions(template);
        calculateTrade('sell', template);
        console.log('callback');

    }
});

Template.game.onCreated(function(){
    var instance = this;
    instance.analyzedData = new ReactiveVar([]);
    instance.position = new ReactiveVar(208);
    instance.loading = new ReactiveVar(false);
    instance.balance = new ReactiveVar(0);
    instance.leverage = new ReactiveVar(50);
    instance.riskPercent = new ReactiveVar(5);
    instance.unitPercent = new ReactiveVar(80);
    instance.limit = new ReactiveVar(0);
    instance.stoploss = new ReactiveVar(30);
    instance.takeProfit = new ReactiveVar(90);
    instance.spread = new ReactiveVar(0);
    instance.nextPos = function (){
        var pos = instance.position.get();
        if(0 > (pos + 1))
        {
            pos = 209;
        }else{
            pos = pos - 1;
        }
        console.log('Pos: '+pos);
        instance.position.set(pos);
    };

});

Template.game.onRendered = function(){

};