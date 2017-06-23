/**
 * Created by aofrozen on 8/30/2015.
 */

deMessage = {
    'create' : function(userId, fromUserId, saidUserId, message){
        co.messages.insert({
            userId: userId,
            fromUserId: fromUserId,
            saidUserId: saidUserId,
            message: message
        });
    },
    'remove' : function(userId, messageIds){
        co.messages.remove({'userId' : userId, '_id' : {$in:messageIds}});
    },
    'removeAll' : function(userId, fromUserId){
        co.messages.remove({
            userId: userId,
            fromUserId: fromUserId
        });
    }
};