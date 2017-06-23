Meteor.publishComposite('alarms', {
    find: function(){
        console.log('subscribe to alarms.');
        /*
         co.pmo.find({});
         */
        return co.alarms.find({});
    }
});