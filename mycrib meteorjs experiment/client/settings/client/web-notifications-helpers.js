/**
 * Created by scvjustin on 8/26/2015.
 */
Template.webNotificationsSettings.helpers({
   'data' : function(){ return Template.instance().webNotificationData(); }
});

Template.webNotificationsSettings.rendered = function(){

};

Template.webNotificationsSettings.onCreated(function(){
   var _i = this;
   _i.autorun(function(){
      _i.webNotificationData = function(){
         return co.userSettings.findOne({'userId': m.uid()}).webNotifications;
      };
   });
});