/**
 * Created by Justin on 9/7/15.
 */
Meteor.methods({
'readWebNotification': function (notificationId) {
    if (!m.uid())
        m.err(500, 'Require to log in');
    deWebNotification.setAsRead(notificationId);
    return true;
},
'deleteWebNotification': function (notificationId) {
    m.log('called deleteWebNotitication');
    if (!m.uid())
        m.err(500, 'Require to log in');
    deWebNotification.remove(notificationId);
    return true;
}
,
'acceptFriendRequest': function (notificationId) {
    m.log('acceptFriendRequest');
    if (!m.uid())
        m.err(500, 'Require to log in');
    var data = deWebNotification.get(notificationId);
    deFriend.create(data.fromUserId, data.userId, true);
    deFriend.create(data.userId, data.fromUserId, true);
    deProfile.updateFriendCount(data.userId, 1);
    deProfile.updateFriendCount(data.fromUserId, 1);
    /*
    Follows
     */
    if(_.isObject(deFollows))
    {
        deFollows.create(data.fromUserId, data.userId, true);
        deProfile.updateFollowCount(data.fromUserId, 1);
        deFollows.create(data.userId, data.fromUserId, true);
        deProfile.updateFollowCount(data.userId, 1);
    }
    deWebNotification.remove(notificationId);
}
,
'rejectFriendRequest': function (notificationId) {
    m.log('rejectFriendRequest');
    if (!m.uid())
        m.err(500, 'Require to log in');
    deWebNotification.remove(notificationId);
}
});