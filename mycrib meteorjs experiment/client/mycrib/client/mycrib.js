
/**
 * EVENTS
 */

Template.main.events({
   'click #togglebtn' : function(e){
      e.preventDefault();
      console.log('clicked leftNavSlide');
      deModalBox.close();
      deNav.leftNavSlide();
   },
   'click .close-nav' : function(e){
      deNav.close();
   },
   'click .settings-btn' : function(e){
      e.preventDefault();
      deNav.close();
      deModalBox.open('accountSettings', 'accountSettings', {'max-width' : '800px', 'height' : '500px'});
   },
   /* Messages */

   /* Notifications */

   /* Online Users */
   'click .online-users-btn' : function(e){
      deModalBox.close();
      deNav.rightNavSlide();
   },
   'click .main-container' : function(e){
      //console.log('click main container');
      if(deNav.getLeftNavToggle() == true || deNav.getRightNavToggle() == true) {
         console.log('close');
         if(deNav.getLock() == false)
         {
            deNav.close();
         }
      }
      /*
      if(deModalBox.isOpen == true)
      {
         console.log('called to close modal from main');
         deModalBox.close();
         deCurrentRoutes.updateDefault();
      }*/
   },
   'click .message-nav-btn' : function(e){
      e.preventDefault();
      console.log('click messages btn');
      Meteor.call('resetNewMessageCount');
   },
   'click .notification-nav-btn' : function(e){
      e.preventDefault();
      console.log('click new notifications btn');
      Meteor.call('resetNewWebNotificationCount');
   },
   'click .user-online-item' : function(e){
      e.preventDefault();
      deNav.close();
      m.sset('messageUserId', $(e.currentTarget).attr("data-userid"));
      deCurrentRoutes.update('messages', '', '');
      deModalBox.open('messages', '', {'width' : '100%', 'max-width' : '900px', 'padding' : '0px'});
   },
   'click .modal-box-overlay' : function(e){
      if(deModalBox.isOpen == true)
      {
         console.log('called to close modal from main');
         deModalBox.close();
         deCurrentRoutes.updateDefault();
      }
   }
});


/**
 * HELPERS
 */

Template.main.helpers({
   'newNotifications':function(){
      if(typeof Template.instance().newNotificationsData() === 'undefined')
      {
         return false;
      }
      if(Template.instance().newNotificationsData().count > 0)
      {
         deTitle.setAlertTitle(Template.instance().newNotificationsData().count+' new notification(s)');
         return Template.instance().newNotificationsData();
      }
      return false;
   },
   'newMessages' : function(){
      if(typeof Template.instance().newMessagesData() === 'undefined')
      {
         return false;
      }
      if(Template.instance().newMessagesData().count > 0)
      {
         deTitle.setAlertTitle(Template.instance().newMessagesData().count+' new message(s)');
         return Template.instance().newMessagesData();
      }

      return false;
   },
   'newMessagesExist' : function(){
      return typeof Template.instance().newMessagesData.count === 'undefined';
   },
   'newNotificationsExist' : function(){
      return typeof Template.instance().newNotificationsData.count === 'undefined';
   },
   'isNavigationClearRequired' : function(){
     return false;
   },
   'friendStatusList' : function(){
      return Template.instance().friendStatusList();
   },
   'friendFullname' : function(){
      var profile = co.userProfiles.findOne({'userId' : this.friendId});
      if(profile)
         return profile.fullname
   },
   'friendOnline' : function(){
      var friend = Meteor.users.findOne({'_id' : this.friendId});
      if(friend && friend.status.online)
      {
         console.log('online');
         return true;
      }else{
         console.log('offline');
         return false;
      }
   },
   'mb_template' : function(){
      return m.sget('mb_template');
   },
   'mb_template_exists' : function(){
      return m.sget('mb_template') !== null;
   }
});

/**
 * ONCREATED
 */

Template.main.onCreated(function(){
   var instance = this;
   var messageReloadLock = false;
   instance.autorun(function(){
      instance.newNotificationsData = function(){
         var result = co.newNotifications.findOne({'userId' : m.uid()});
         if(result)
            return result.notification;
      };
      instance.newMessagesData = function(){
         var result = co.newNotifications.findOne({'userId' : m.uid()});
         if(result)
            return result.message;
      };
      instance.friendStatusList = function(){
         var result = co.friends.find({'userId' : m.uid()});
         if(result)
            return result;
      }
   });
});

/**
 * RENDERED
 */

Template.main.onRendered(function () {
   var template = this;
   deTitle.set('MyCrib');
   $('.dropdown-toggle').dropdown();
   /*var menu = this.find('#menu');
    var panel = this.find('#panel');
    var slideout = new Slideout({
    'panel': panel,
    'menu': menu,
    'padding': 256,
    'tolerance': 70
    });*/

   // Toggle button
   /*var togglebtn = this.find('#togglebtn');
    togglebtn.addEventListener('click', function() {
    slideout.toggle();
    });
    */
   Router.onStop(function(){
      deNav.close();
   });
});