Meteor.publishComposite('ticks', {
   find: function(){
       console.log('subscribe to ticks.');
       /*
           co.pmo.find({});
        */
       return co.ticks.find({});
   }
});

Meteor.publishComposite('prepareMarketOrder', function(instrument){
    return {find: function(){
        console.log('subscribe to prepare market order');
        console.log('inst: '+instrument);
        if(typeof instrument !== 'undefined' && instrument != null && instrument != '')
        {
            return co.pmo.find({'instrument' : instrument}, {limit: 1, sort: {updatedAt: -1}});
        }else{
            return co.pmo.find({}, {limit: 1, sort: {updatedAt: -1}});
        }

    }
}});

Meteor.publishComposite('openTrades', function(){
   return {find: function(){
       console.log('subscribe to open trades');
       return co.trades.find({}, {sort:{time:-1}});
   }} ;
});

Meteor.publishComposite('autopilot', function(instrument){
    return {find: function(){
       console.log('subscribe to autopilot');
       return co.pmo.find({}, {limit: 1, sort: {updatedAt: -1}});
    },
        children:[
            {
                find: function(pmo){
                    return co.autopilot.find({'instrument' : pmo['instrument']});
                }
            }
        ]
    };
});