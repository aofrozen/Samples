Meteor.methods({
    'createAlarm' : function(alarm){
        console.log('createAlarm');
        var alarmModel = new alarms();
        alarmModel.create(alarm);
    },
    'removeAlarm' : function(alarmID){
        console.log('removeAlarm');
        var alarmModel = new alarms();
        alarmModel.remove(alarmID);
    },
    'changeAlarm' : function(alarm){
        console.log('changeAlarm');
        var alarmModel = new alarms();
        alarmModel.change(alarm);
    },
    'enableAlarm' : function(alarmID){
        console.log('enableAlarm');
        var alarmModel = new alarms();
        alarmModel.enable(alarmID);
    },
    'disableAlarm' : function(alarmID){
        console.log('disableAlarm');
        var alarmModel = new alarms();
        alarmModel.disable(alarmID);
    },
    'resetAlarm' : function(alarmID){
        console.log('resetAlarm');
        var alarmModel = new alarms();
        alarmModel.reset(alarmID);
    },
    'testAlarm' : function(alarmID){
        console.log('testAlarm');
        var alarmModel = new alarms();
        alarmModel.test(alarmID);
    }
});