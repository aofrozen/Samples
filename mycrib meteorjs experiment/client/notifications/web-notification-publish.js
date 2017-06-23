/**
 * Created by Justin on 9/7/15.
 */
Meteor.publishComposite('webNotifications', function (rows) {
    return {
        find: function () {
            m.log('subscribed to webNotification');
            return co.notifications.find({'userId': this.userId}, {limit: rows, sort: {'creationDate' : -1}});
        },
        children: [{
            find: function (notifications) {
                return co.userProfiles.find({userId: notifications.fromUserId}, {
                    fields: {
                        'fullname': 1,
                        'userId': 1,
                        'userAvatar': 1
                    }
                });
            }
        }]
    };
});

Meteor.publish('webNotification.isFriendRequestSent', function (userId) {
    return co.notifications.find({'userId': userId, 'fromUserId': this.userId, 'type': 'friendRequest'});
});