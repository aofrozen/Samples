/**
 * Created by Justin on 9/7/15.
 */
Meteor.publish('newNotification', function(){
    m.log('Server: subscribed to newNotification');
    return co.newNotifications.find({userId: this.userId});
});
