/**
 * Created by Justin on 12/12/15.
 */
//This is for viewing all comments from timeline post
Meteor.publishComposite('comments.read', function (serviceName, serviceId, rows) {
    if (_.isUndefined(rows))
        rows = 5;
    m.log('service id: '+serviceId);
    return {
        find: function () {
            return co.comments.find({
                'serviceId': serviceId,
                'serviceName': serviceName,
                'parentId': {$exists: false}
            }, {sort: {'creationDate': -1}, limit: rows});
        },
        children: [
            {
                find: function (comments) {
                    return co.comments.find({
                        serviceId: serviceId,
                        serviceName: serviceName,
                        parentId: comments._id
                    }, {sort: {'creationDate': -1}});
                },
                children: [
                    {
                        find: function (replycomments, comments) {
                            return co.userProfiles.find({'userId': {$in: [comments.userId, replycomments.userId]}}, {
                                'userAvatar': 1,
                                'fullname': 1,
                                'userId': 1
                            });
                        }
                    }
                ]
            }
        ]
    };
});
