/**
 * Created by Justin on 9/7/15.
 */
Meteor.methods({
    'resetNewMessageCount' : function(){
        deNewNotification.resetNewMessageCount();
    },
    'resetNewWebNotificationCount' : function(){
        m.log('reset new web notification count');
        deNewNotification.resetNewWebNotificationCount();
    }
});

