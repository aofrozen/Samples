/**
 * Created by Justin on 9/7/15.
 */



/* BEGIN OF FRIEND */
Meteor.publish('friend.isFriend', function(userId){
    return co.friends.find({'userId' : this.userId, 'friendId' : userId});
});
Meteor.publishComposite('friend.getFriends', function(userId, limit){
    console.log('subscribed to friends');
    console.log('limit: '+limit);
    console.log('user id '+userId);
    return {
        find:function(){
            return co.friends.find(
                {'userId' : userId}, {limit: limit, sort: {'creationDate' : -1}}
            )},
        children:[{find: function(friends){
            return co.userProfiles.find({'userId' : friends.friendId}, {fields: {'userId' : 1, 'fullname' : 1, 'userAvatar' : 1}});
        }}]
    };
});
Meteor.publishComposite('friend.getFriendStatusList', {
    find: function(){
        console.log('subscribed to friend status list');
        return co.friends.find({'userId' : this.userId, 'isFriend' : true});
    },
    children: [
        {
            find: function(friends){
                return Meteor.users.find({'_id' : friends.friendId}, {fields: {'_id' : 1, 'status.online': 1}})
            }
        },
        {
            find: function(friends){
                return co.userProfiles.find({'userId' : friends.friendId}, {fields: {'userId':1, 'fullname' : 1, 'userAvatar' : 1}});
            }
        }
    ]
});
/* END OF FRIEND */