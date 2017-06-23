/**
 * Created by aofrozen on 8/30/2015.
 */

deNewNotification = {
    'getMessageLastCheckDate': function (userId) {
        return co.newNotifications.findOne({'userId': userId}, {'message.lastCheckDate': 1}).message.lastCheckDate;
    },
    'reloadMessageCount': function (userId) {
        /*** CHECK ROUTE ***/
        var userRoute = deRouter.getUserCurrentRoute(userId);
        if(userRoute.currentRouteName == 'messageInbox' || (userRoute.currentRouteName == 'messages' && userRoute.currentRouteUserId == m.uid()))
        {
            m.log('Already current message inbox. no count update.');
            return 1;
        }
        m.log('reloadMessageCount '+userId);
        var lastCheckDate = deNewNotification.getMessageLastCheckDate(userId);
        var newCount = deMessageInbox.countNewInbox(userId, lastCheckDate);
        m.log('called reloadNewMessageCount '+newCount);
        return co.newNotifications.update({userId: userId}, {$set:{message:{count: newCount, lastCheckDate: new Date()}}});
    },
    'getNotificationLastCheckDate': function (userId) {
        m.log('called getNotificationLastCheckDate');
        return co.newNotifications.findOne({'userId': userId}, {'notification.lastCheckDate': 1}).notification.lastCheckDate;
    },
    'reloadNotificationCount': function (userId) {
        var userRoute = deRouter.getUserCurrentRoute(userId);
        m.log('called reloadNotificationCount');
        if(userRoute.currentRouteName == 'notifications')
        {
            m.log('Already current notifications. no count update.');
            return 1;
        }
        var lastCheckDate = deNewNotification.getNotificationLastCheckDate(userId);
        m.log(lastCheckDate);
        var newCount = deWebNotification.countNotification(userId, lastCheckDate);
        m.log(newCount);
        return co.newNotifications.update({'userId': userId}, {$set: {notification:{count: newCount, lastCheckDate: new Date()}}});
    },
    'resetNewMessageCount' : function(){
        co.newNotifications.update({userId: m.uid()}, {$set:{message:{count:0, lastCheckDate: new Date(), reload: false}}});
    },
    'resetNewWebNotificationCount' : function(){
        co.newNotifications.update({userId: m.uid()}, {$set:{notification: {count:0, lastCheckDate: new Date(), reload: false}}});
    }
};
