/**
 * Created by Justin on 9/7/15.
 */
Meteor.methods({
    'friend.sendFriendRequest': function (userId) {
        m.log('Server: called sendFriendRequest Method');
        if(userId == m.uid())
            throw new Meteor.Error(500, "You can't add yourself as a friend");
        if(deBlockedAccount.isUserBlocked(m.uid(), userId))
        {
            throw new Meteor.Error(500, "You can't add this user as a friend due to you block this user.");
        }
        if(deBlockedAccount.isUserBlocked(userId, m.uid()))
        {
            throw new Meteor.Error(500, "You can't add this user as a friend due to she/he blocks you.");
        }
        if (co.friends.find({userId: m.uid(), friendId: userId}).count() > 0) {
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
    'friend.remove': function (userId, friendId) {
        if(m.uid() == friendId)
        {
            friendId = userId;
        }
        if (co.friends.find({
                userId: m.uid(),
                friendId: friendId,
                isFriend: true
            }).count() > 0 && co.friends.find({
                userId: friendId,
                friendId: m.uid(),
                isFriend: true
            }).count() > 0) {
            //friend already exists
            deFriend.remove(m.uid(), friendId);
            deFriend.remove(friendId, m.uid());
            deProfile.updateFriendCount(m.uid(), -1);
            deProfile.updateFriendCount(friendId, -1);

            //remove follow
            if(_.isObject(deFollows))
            {
                deFollows.remove(m.uid(), friendId);
                deProfile.updateFollowCount(m.uid(), -1);
                deFollows.remove(friendId, m.uid());
                deProfile.updateFollowCount(friendId, -1);
            }
            m.log('removed friend');
            return true;
        }
        m.log('Server: called removeFriend Method');
    },
    'friend.isFriend': function (userId) {
        m.log('friend.isFriend is called');
        m.log(co.friends.findOne({'userId': m.uid(), 'friendId': userId}));
        return co.friends.find({'userId': m.uid(), 'friendId': userId}).count();
    }
});