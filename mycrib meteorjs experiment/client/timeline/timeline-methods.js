Meteor.methods({
    'timeline.post': function (data) {
        /*
           Data structure

         */

        //check security if user id is valid
        deSecurity.checkUser(m.uid());

        //set variables
        var embed = {};
        var photos = {};


        //check if embed exists
        if (typeof data.embed === 'object' && typeof data.embed.data === 'object') {
            embed = data.embed.data;
        }

        //check if photo exists
        if (typeof data.photos === 'object') {
            photos = data.photos;
        }


        co.timeline.insert({
            'userId': m.uid(),
            'creationDate': new Date(),
            'type': data.postType,
            'title': data.title,
            'body': data.body,
            'embed': {
                'link': embed.link,
                'description': embed.description,
                'providerName': embed.provider_name,
                'html': embed.html,
                'thumbnailUrl': embed.thumbnail_url,
                'title': embed.title,
                'height': embed.height,
                'width': embed.width,
                'type': embed.type
            }
        });
        return true;
    },
    'timeline.remove': function (data) { //OK
        /*
        Data structure

         id (timeline post id)

         */

        //get timeline post info for user ID
        var authorTimelinePost = co.timeline.findOne({'_id': data.id});


        //check if this timeline post is his/her as author
        if(m.uid() === authorTimelinePost.userId)
        {
            //remove timeline post
            co.timeline.remove({'_id': data.id, 'userId': m.uid()});


            //remove comments under this timeline post
            co.comments.remove({'serviceId': data.id});
        }else{
            m.err(500, "This post can't be removed.");
        }

    },
    "timeline.replyComment": function (data) { //OK

        /*
         Data structure

         commentId (reply comment id)
         body

         */
        var parentId;

        //check if data is not empty or missing
        if (_.isObject(data) !== true)
            m.err('Data is not object', 500);


        //get target comment data for parentId
        var authorCommentData = deCommentServer.getInfo(data.commentId);

        //check if comment already replies or not
        if (_.isString(authorCommentData.parentId)) {
            parentId = authorCommentData.parentId; //yes comment has replied
        } else {
            parentId = authorCommentData._id; //no comment has not replied
        }


        //get timeline info for security & privacy
        var authorTimelinePost = deTimelineServer.getItem(authorCommentData.serviceId);

        //check privacy and security
        deSecurity.checkUser(authorTimelinePost.userId);
        deSecurity.checkPrivacy(authorTimelinePost.userId);

        //Write in data with required fields
        data.userId = m.uid();
        data.serviceName = 'timeline';
        data.serviceId = authorCommentData.serviceId;
        data.parentId = parentId;
        data.creationDate = new Date();
        data.replyCommentId = authorCommentData._id;



        //write a reply comment
        deCommentServer.reply(data);


        //make sure that both posts are different author because not need to send twice notification to the same author.
        if(authorTimelinePost.userId != authorCommentData.userId)
        {
            //post a notification for author to read. For timeline author
            notificationData = {
                'userId': authorTimelinePost.userId,
                'fromUserId': m.uid(),
                'targetId': authorTimelinePost._id, //timeline id
                'type': 'timelineComment'
            };
            deWebNotification.create(notificationData);

            //reload notification counts
            deNewNotification.reloadNotificationCount(authorTimelinePost.userId);
        }

        console.log('sent notification');

        //post a notification for author to read. For comment author
        var notificationData = {
            'userId': authorCommentData.userId,
            'fromUserId': m.uid(),
            'targetId': authorTimelinePost._id, //timeline id
            'type': 'timelineReplyComment'
        };
        deWebNotification.create(notificationData);

        //reload notification counts
        console.log('reload');
        deNewNotification.reloadNotificationCount(authorCommentData.userId);

    }
});