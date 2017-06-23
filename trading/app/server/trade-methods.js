/*
 Subscribe to Publish
 Method Call
 */

Meteor.methods({
    'prepareMarketOrder' : function(data)
    {
        console.log('Method: called prepareMarketOrder');
        var t = new trade();
        t.prepare(data);
    },
    'openTrade' : function(side){
        console.log('Method: called openTrade');
        var t = new trade();
        t.openTrade(side);
    },
    'closeTrade' : function(){
        console.log('Method: Called closeTrade');
        var t = new trade();
        t.closeTrade(function(success, error){
            return {'error' : error, 'success' : success};
        });
    },
    'run' : function(){

    },
    'stop' : function(){

    },
    'saveAutoPilot' : function(data){
        console.log(data);
        var ap = new autopilot();
        data.createdAt = data.createdAt || new Date();
        data.openTrade = (data.openTrade) ? data.openTrade : false;
        autopilotChange = true;
        ap.save(data);
    },
    'toggleAutoPilot' : function(data){
        console.log('toggle autopilot');
        var ap = new autopilot();
        console.log(data);
        ap.calculate(data);
        data.isRun = (data.isRun !== true);
        ap.toggle(data);
        autopilotChange = true;
    },
    'resetAutoPilot' : function(data){
        console.log('reset autopilot');
        var ap = new autopilot();
        data.createdAt = data.createdAt || new Date();
        ap.save(data);
        var t = new trade();
        t.closeTrade(function(error, success){

        });

        autopilotChange = true;
    }
});