/**
 * Created by aofrozen on 8/18/2015.
 */
deWebNotification = {
    'create': function (data) {
        m.log('created web notification');
        /* Data: {currentUserId, userId, type, message }*/
        var userSettings = co.userSettings.find({'userId' : data.userId}),
            allowedWebNotification;
        if(typeof userSettings !== 'undefined')
        {
            var webNotificationSettings = userSettings.webNotificationSettings;
        }else{
            m.log("User settings don't exist.");
            m.err(500, "User settings don't exist.");
        }
        /*
            1. Joined your event
            2. sent direct message
            3. sent friend request
            4. sent comment
        */
        ////photo comment, video comment, reply to comment, event invite
        switch(data.type){
            case 'joinedYourEvent':
            allowedWebNotification = webNotificationSettings.joinedYourEvent;
            break;
            case 'sentEventPhotoComment':
            allowedWebNotification = webNotificationSettings.sentEventPhotoComment;
            break;
            case 'sentEventVideoComment':
            allowedWebNotification = webNotificationSettings.sentEventVideoComment;
            break;
            case 'sentEventComment':
            allowedWebNotification = webNotificationSettings.sentEventComment;
            break;
            case 'upcomingEvents':
            allowedWebNotification = webNotificationSettings.upcomingEvents;
            break;
            default:
            allowedWebNotification = true;
            break;
        }
        if(allowedWebNotification === true)
        {
            return co.notifications.insert({
                'userId': data.userId,
                'fromUserId': data.fromUserId,
                'type': data.type,
                'message' : data.message,
                'targetId': data.targetId,
                'isRead' : false
            });
        }
    },
    'remove': function (notificationId) {
        /* Data: {currentUserId, notification Id}*/
       return co.notifications.remove({
           '_id': notificationId, 'userId': m.uid()
       });
    },
    'get': function (notificationId) {
        return co.notifications.findOne({'_id': notificationId});
    },
    'update': function(data){

    },
    'countNotification': function (userId, lastCheckDate) {
        m.log('called countNotification(deWebNotification)');
        m.log(lastCheckDate);
        m.log({'userId': userId, creationDate: {$gt: lastCheckDate}});
        return co.notifications.find({'userId': userId, isRead: false}).count(); //, creationDate: {$gt: lastCheckDate}
    },
    'setAsRead' : function(notificationId){
        m.log('set as read'+notificationId);
        return co.notifications.update({'_id': notificationId, 'userId': m.uid()}, {$set: {isRead: true}});
    }
};