/**
 * Created by Justin on 9/7/15.
 */



/* BEGIN OF FRIEND */
Meteor.publish('follow.isFollow', function(userId){
    return co.follows.find({'userId' : this.userId, 'followId' : userId});
});
Meteor.publishComposite('follow.getFollows', function(userId, limit){
    console.log('subscribed to follows');
    console.log('limit: '+limit);
    console.log('user id '+userId);
    return {
        find:function(){
            return co.follows.find(
                {'userId' : userId}, {limit: limit, sort: {'creationDate' : -1}}
            )},
        children:[{find: function(follows){
            return co.userProfiles.find({'userId' : follows.followId}, {fields: {'userId' : 1, 'fullname' : 1, 'userAvatar' : 1}});
        }}]
    };
});
Meteor.publishComposite('follow.getFollowStatusList', {
    find: function(){
        console.log('subscribed to follows status list');
        return co.follows.find({'userId' : this.userId, 'isFriend' : true});
    },
    children: [
        {
            find: function(follows){
                return Meteor.users.find({'_id' : follows.followId}, {fields: {'_id' : 1, 'status.online': 1}})
            }
        },
        {
            find: function(follows){
                return co.userProfiles.find({'userId' : follows.followId}, {fields: {'userId':1, 'fullname' : 1, 'userAvatar' : 1}});
            }
        }
    ]
});
/* END OF FRIEND */