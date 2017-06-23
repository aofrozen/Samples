/**
 * Created by Justin on 9/7/15.
 */
Meteor.methods({
    'follows.add': function (userId) {
        m.log('Server: called follows.add Method');
        if(userId == m.uid())
            m.err(500, "You can't add yourself as a friend");
        if (co.follows.find({userId: m.uid(), friendId: userId}).count() > 0) {
            //friend already exists
            m.log('already friend');
            return false;
        }
        var userRoute = deRouter.getUserCurrentRoute(userId);
        if (co.notifications.find({
                userId: userId,
                fromUserId: m.uid(),
                type: 'friendRequest'
            }).count() > 0) {
            //notification exists
            m.log('notification exists');
            co.notifications.remove({userId: userId, fromUserId: m.uid(), type: 'friendRequest'});
            if (userRoute.currentRouteName != 'webNotifications') {
                deNewNotification.reloadNotificationCount(userId);
            }
            return true;
        } else {
            //notification doesn't exist
            m.log('notification not exists');
            m.log(userId + ', ' + m.uid());
            co.notifications.insert({userId: userId, fromUserId: m.uid(), type: 'friendRequest'});
            if (userRoute.currentRouteName != 'webNotifications') {
                deNewNotification.reloadNotificationCount(userId);
            }
            return true;
        }
    },
    'follows.remove': function (userId) {
        if (co.follows.find({
                userId: m.uid(),
                friendId: userId,
                isFriend: true
            }).count() > 0 && co.follows.find({
                userId: userId,
                friendId: m.uid(),
                isFriend: true
            }).count() > 0) {
            //friend already exists
            deFriend.remove(m.uid(), userId);
            deProfile.updateFollowCount(m.uid(), -1);
            m.log('removed friend');
            return true;
        }
        m.log('Server: called removeFriend Method');
        m.log(friendModule);
    },
    'follows.isFollow': function (userId) {
        m.log('follows.isFollow is called');
        m.log(co.follows.findOne({'userId': m.uid(), 'followId': userId}));
        return co.follows.find({'userId': m.uid(), 'followId': userId}).count();
    }
});