Template.alarm.helpers({
    'alarmObj' : function(){
        console.log('Alarm '+Template.instance().alarmID.get());
        return co.alarms.find({'_id' : Template.instance().alarmID.get()});
    },
    'alarmItems' : function(){
        return Template.instance().alarmItems();
    },
    'status' : function(value){
        if(value)
        {
            return 'Active';
        }else{
            return 'Inactive';
        }
    },
    'touch' : function(value){
        if(value){
            return 'Yes';
        }else{
            return 'No';
        }
    },
    'direction' : function(value){
        if(value == 'Greater')
        {
            return 'g'; //X < Price
        }else if(value == 'Less'){
            return 'l'; //X > Price
        }
        if(value == 'g')
        {
            return ' Top ';
        }else{
            return ' Bottom ';
        }
    },
    'isChecked' : function(value)
    {
      if(value)
          return 'checked';
      return '';
    },
    'priceAction' : function(instrument){
        var tick = Template.instance().getTicks();
        return tick['ask']+' ('+tick['instrument']+')';

    },
    'selectInstrument' : function(value){
        if(this.instrument == '' || typeof this.instrument === 'undefined')
            return '';
        if(value == this.instrument)
        {
            return true;
        }else{
            return false;
        }
    },
    'smartPriceRangeDirection' : function(){
        var tick = Template.instance().getTicks();
        var pricePosition = Template.instance().pricePosition.get();
        var pips;
        /*
        Rule of Direction

        If ask > price position then bottom
        If ask < price position then top
         */
        if(tick['ask'] > pricePosition)
        {
            pips = ((tick['ask']-pricePosition)*pipConverter($('.instrument').val())).toFixed(2);
            $('.price-range-direction').val('l');
            return ' Less '+pips+' pips';
        }else{
            pips = ((pricePosition-tick['ask'])*pipConverter($('.instrument').val())).toFixed(2);
            $('.price-range-direction').val('g');
            return ' Greater '+pips+' pips';
        }
    }
});
getAlarmData = function(modalName){
  var alarm = {};
  alarm['createdAt'] = new Date();
  alarm['isEnabled'] = true;
  alarm['alarmName'] = $(modalName+' .alarm-name').val();
  alarm['instrument'] = $(modalName+' .instrument').val();
  alarm['pricePosition'] = $(modalName+' .price-position').val();
  alarm['priceRangeDirection'] = $(modalName+' .price-range-direction').val();
  alarm['alarmAttemptMax'] = $(modalName+' .alarm-attempt-max').val();
  alarm['alarmAttemptDuration'] = $(modalName+' .alarm-attempt-duration').val();
  alarm['alarmUpdatedAt'] = new Date();
  alarm['alarmUpdatedAt'].setDate(alarm['alarmUpdatedAt'].getDate()-1);
  alarm['isLightEnabled'] = $(modalName+' .enable-light-alarm').is(':checked');
  alarm['lightName'] = $(modalName+' .light-name').val();
  alarm['isTextEnabled'] = $(modalName+' .enable-text-alarm').is(':checked');
  alarm['textNumbers'] = $(modalName+' .text-numbers').val();
  alarm['textMessage'] = $(modalName+' .text-message').val();
  alarm['isTouched'] = false;
  $("#create-alarm-modal input[type=text]").val('');
  return alarm;
};

setAlarmForms = function(){

};

Template.alarm.events({
    'keyup .price-position' : function(event, template){
          template.pricePosition.set(event.currentTarget.value);
    },
    'click .edit-alarm-btn' : function(event, template){
        var alarmID = event.currentTarget.id;
        template.alarmID.set(alarmID);
        $('#edit-alarm-modal').modal('show');
    },
    'click .save-alarm-changes-btn' : function(event, template){
        $('#edit-alarm-modal').modal('hide');
        var alarm = getAlarmData('#edit-alarm-modal');
        alarm['_id'] = event.currentTarget.id;
        Meteor.call('changeAlarm', alarm, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    },
    'click .enable-alarm-btn' : function(event, template){
        var alarmID = event.currentTarget.id;
        Meteor.call('enableAlarm', alarmID, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    },
    'click .disable-alarm-btn' : function(event, template){
        var alarmID = event.currentTarget.id;
        Meteor.call('disableAlarm', alarmID, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    },
    'click .create-alarm-forms-btn' : function(event, template) {
        $('#create-alarm-modal').modal('show');
    },
    'click .create-alarm-btn' : function(event, template){
        $('#create-alarm-modal').modal('hide');
        var alarm = getAlarmData('#create-alarm-modal');
        Meteor.call('createAlarm', alarm, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    },
    'click .reset-alarm-btn' : function(event, template){
        var alarmID = event.currentTarget.id;
        Meteor.call('resetAlarm', alarmID, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    },
    'click .test-alarm-btn' : function(event, template){
        var alarmID = event.currentTarget.id;
        Meteor.call('testAlarm', alarmID, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    },
    'click .remove-alarm-btn' : function(event, template){
        var alarmID = event.currentTarget.id;
        Meteor.call('removeAlarm', alarmID, function(error, success){
            if(error)
            {

            }
            if(success)
            {

            }
        });
    }
});

Template.alarm.onCreated(function(){
    console.log('onCreated');
    var instance = this;
    instance.pricePosition = new ReactiveVar(0);
    instance.alarmID = new ReactiveVar(0);
    instance.autorun(function () {
    Meteor.subscribe('alarms');
    Meteor.subscribe('ticks');
    Meteor.subscribe('prepareMarketOrder');
    instance.alarmItems = function(){
      return co.alarms.find({});
    };
    instance.getTicks = function () {
        var p = co.pmo.findOne({}, {sort: {updatedAt: -1}});
        if (typeof p !== 'undefined') {
            return co.ticks.findOne({'instrument': p['instrument']});
        }
    };
    });
});

Template.alarm.onRendered = function(){

};