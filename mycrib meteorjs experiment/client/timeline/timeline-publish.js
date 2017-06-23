//This is for homepage timeline
Meteor.publishComposite('timeline', function (userId, rows) { //soon add date for infinite scroll
    m.log('subscribed to timeline');
    if (typeof rows === 'undefined') {
        rows = 8;
    }
    return {
        find: function () {
            return co.follows.find({'userId': userId});
        }
        ,
        children: [{
            find: function (follows) {
                return co.timeline.find({'userId': follows.followId}, {
                    sort: {'creationDate': -1},
                    limit: rows
                });
            }, children: [
                {

                    find: function (timeline, friends) {
                        return co.comments.find({
                            serviceId: timeline._id,
                            serviceName: 'timeline',
                            parentId: {$exists: false}
                        }, {sort: {'creationDate': -1}, limit: 3});
                    },
                    children: [
                        {
                            find: function (comments, timeline, friends) {
                                return co.comments.find({
                                    serviceId: timeline._id,
                                    serviceName: 'timeline',
                                    parentId: comments._id
                                }, {sort: {'creationDate': -1}, limit: 3});
                            },
                            children: [
                                {
                                    find: function (replycomments, comments, timeline, friends) {
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
                }
            ]
        }]

    }
});


//This is for profile timeline
Meteor.publishComposite('timeline.self', function (userId, rows) { //soon add date for infinite scroll
    m.log('subscribed to timeline.self');
    if (typeof rows === 'undefined') {
        rows = 8;
    }
    return {
        find: function () {
            return co.timeline.find({'userId': userId}, {sort: {'creationDate': -1}, limit: rows});
        },
        children: [
            {
                find: function (timeline) {
                    return co.comments.find({
                            serviceId: timeline._id,
                            serviceName: 'timeline',
                            parentId: {$exists: false}
                        },
                        {sort: {'creationDate': -1}, limit: 3});
                },
                children: [
                    {
                        find: function (comments, timeline) {
                            return co.comments.find({
                                serviceId: timeline._id,
                                serviceName: 'timeline',
                                parentId: comments._id
                            }, {sort: {'creationDate': -1}, limit: 3});
                        },
                        children: [
                            {
                                find: function (replycomments, comments, timeline) {
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
            }
        ]
    };
});

//This is for viewing a single timeline post
Meteor.publishComposite('timeline.item', function (userId, timelineId, rows) {
    m.log('subscribed to timeline.item');
    m.log('timeline Id: ' + timelineId);
    if (typeof rows === 'undefined')
        rows = 10;
    return {
        find: function () {
            return co.timeline.find({'userId': userId, '_id': timelineId});
        },
        children: [
            {
                find: function (timeline) {
                    return co.comments.find({
                            serviceId: timeline._id,
                            serviceName: 'timeline',
                            parentId: {$exists: false}
                        },
                        {sort: {'creationDate': -1}, limit: rows});
                },
                children: [
                    {
                        find: function (comments, timeline) {
                            return co.comments.find({
                                serviceId: timeline._id,
                                serviceName: 'timeline',
                                parentId: comments._id
                            }, {sort: {'creationDate': -1}});
                        },
                        children: [
                            {
                                find: function (replycomments, comments, timeline) {
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
            }
        ]
    };
});