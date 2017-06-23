/**
 * Created by aofrozen on 8/18/2015.
 */
deFollows = {
    'create' : function(currentUserId, userId, isFollow){
        console.log('Server: called addFollow');
        console.log('isFollow: '+isFollow);
        return co.follows.insert({'userId' : currentUserId, 'followId' : userId, 'isFollow' : isFollow});
    },
    'remove' : function(currentUserId, userId){
        console.log('Server: called removeFollow');
        console.log({'userId' : currentUserId, 'followId' : userId});
        return co.follows.remove({'userId' : currentUserId, 'followId' : userId});
    },
    'update' : function(currentUserId, userId, isFollow){
        console.log('Server: called updateFollow');
        return co.follows.update({'userId' : currentUserId, 'followId' : userId}, {$set:{'isFollow' : isFollow}});
    }
};