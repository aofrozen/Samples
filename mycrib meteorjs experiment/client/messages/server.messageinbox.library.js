/**
 * Created by aofrozen on 9/4/2015.
 */


deMessageInbox = {
    'create': function(userId, fromUserId, saidUserId, lastMessage, isRead){
        co.messageInbox.insert({
            userId: userId,
            fromUserId: fromUserId,
            saidUserId: userId,
            lastMessage: lastMessage,
            lastMessageDate: new Date(),
            isRead: isRead
        });
    },
    'update' : function(userId, fromUserId, saidUserId, lastMessage, isRead){
        co.messageInbox.update({
            userId: userId,
            fromUserId: fromUserId
        }, {
            $set: {
                saidUserId: userId,
                lastMessage: lastMessage,
                isRead: isRead,
                lastMessageDate: new Date()
            }
        });
    },
    'remove' : function(userId, messageInboxId){
        co.messageInbox.remove({'userId' : userId, '_id' : messageInboxId});
    },
    'exists' : function(userId, fromUserId){
        return co.messageInbox.find({'userId' : userId, 'fromUserId' : fromUserId}).count() > 0
    },
    'countNewInbox' : function(userId, lastCheckDate){
        return co.messageInbox.find({'userId': userId, lastMessageDate: {$gt: lastCheckDate}}, {}).count();
    },
    'getInfo' : function(userId, messageInboxId){
        return co.messageInbox.findOne({'userId' : userId, '_id' : messageInboxId});
    }
};