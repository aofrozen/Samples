deCommentServer = {
    'write': function (data) {
        co.comments.insert({
            'serviceName': data.serviceName,
            'serviceId': data.serviceId,
            'userId': data.userId,
            'creationDate': new Date(),
            'body': data.body
        });
    },
    'remove': function (data) {  //remove a comment item
        co.comments.remove({ //remove comments
            '_id': data.id
        });
        co.comments.remove({ //remove reply comments
            'parentId': data.id
        });
    },
    'reply': function (data) {
        co.comments.insert({
            'serviceName': data.serviceName,
            'serviceId': data.serviceId,
            'userId': data.userId,
            'creationDate': new Date(),
            'body': data.body,
            'toUserId': data.toUserId,
            'parentId': data.parentId
        });
    },
    'getInfo': function (commentId) {
        return co.comments.findOne({'_id': commentId});
    },
    'removeService' : function(serviceId, serviceName)
    {
        co.comments.remove({'serviceId': serviceId, 'serviceName': serviceName});
    },
    'countComments' : function(serviceId, serviceName)
    {
        return co.comments.find({'serviceId' : serviceId, 'serviceName' : serviceName}).count();
    }
};
