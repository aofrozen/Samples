/**
 * Created by aofrozen on 8/18/2015.
 */
deFriend = {
    'create' : function(currentUserId, userId, isFriend){
        console.log('Server: called addFriend');
        return co.friends.insert({'userId' : currentUserId, 'friendId' : userId, 'isFriend' : isFriend});
    },
    'remove' : function(currentUserId, userId){
        console.log('Server: called removeFriend');
        return co.friends.remove({'userId' : currentUserId, 'friendId' : userId});
    },
    'update' : function(currentUserId, userId, isFriend){
        console.log('Server: called updateFriend');
        return co.friends.update({'userId' : currentUserId, 'friendId' : userId}, {$set:{'isFriend' : isFriend}});
    },
    'isFriend' : function(currentUserId, userId){
        return co.friends.find({'userId' : currentUserId, 'friendId' : userId, 'isFriend' : true}).count() > 0
    }
};