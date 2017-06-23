/**
 * Created by Justin on 12/12/15.
 */
Meteor.methods({
    'comment.write' : function(data){
        var targetUserId, notificationType, photoItem, timelineItem;
        m.isLogged();
        if (_.isObject(data) !== true)
            m.err( 500, 'Data is not object');

        if (_.isUndefined(data.serviceId) || _.isUndefined(data.serviceName))
            m.err( 500, 'Data fields are missing');
        if (data.body === '')
            m.err(500, "You can't leave a comment as blank");
        switch(data.serviceName){
            case 'photo':
                photoItem = dePhotoServer.getInfo(data.serviceId);
                if (_.isUndefined(photoItem))
                    m.err(500, 'Not found photo id');
                targetUserId = photoItem.userId;
                deSecurity.checkUser(targetUserId);
                deSecurity.checkPrivacy(targetUserId);
                notificationType = 'photoComment';
                dePhotoServer.updateCommentCount(data.serviceId, 1);
                break;
            case 'timeline':
                timelineItem = deTimelineServer.getItem(data.serviceId);
                if(_.isUndefined(timelineItem))
                    m.err(500, "Not found timeline id");
                targetUserId = timelineItem.userId;
                deSecurity.checkUser(targetUserId);
                deSecurity.checkPrivacy(targetUserId);
                notificationType = 'timelineComment';
                deTimelineServer.updateCommentCount(data.serviceId, 1); //REVIEW: IF THIS IS CORRECT TO COUNT COMMENT FOR THIS TIMELINE POST
                break;
            case 'journal':

                break;
            default:
                m.err(500, "Service name doesn't exist.");
        }
        data = {
            'creationDate': new Date(),
            'serviceName': data.serviceName,
            'serviceId': data.serviceId,
            'body': data.body,
            'userId': m.uid()
        };
        deCommentServer.write(data);
        var notificationData = {
            'userId': targetUserId,
            'fromUserId': m.uid(),
            'targetId': data.serviceId,
            'type': notificationType
        };
        deWebNotification.create(notificationData);
        deNewNotification.reloadNotificationCount(targetUserId);
        return true;
    },
    'comment.reply' : function(data){
        var targetUserId, notificationType, photoItem, timelineItem, notificationReplyType;
        m.isLogged();
        var parentId;
        if (_.isObject(data) !== true)
            m.err(500, 'Data is not object');
        if(_.isUndefined(data.commentId))
            m.err(500, 'Comment id is required.');
        //get target comment data for parentId
        var authorCommentData = deCommentServer.getInfo(data.commentId);
        //check if comment already replies or not
        if (_.isString(authorCommentData.parentId)) {
            parentId = authorCommentData.parentId; //yes comment has replied
        } else {
            parentId = authorCommentData._id; //no comment has not replied
        }

        switch(authorCommentData.serviceName){
            case 'photo':
                photoItem = dePhotoServer.getInfo(authorCommentData.serviceId);
                if (_.isUndefined(photoItem))
                    m.err(500, 'Not found photo id');
                targetUserId = photoItem.userId;
                notificationType = 'photoComment';
                notificationReplyType = 'photoReplyComment';
                break;
            case 'timeline':
                timelineItem = deTimelineServer.getItem(authorCommentData.serviceId);
                if(_.isUndefined(timelineItem))
                    m.err(500, "Not found timeline id");
                targetUserId = timelineItem.userId;
                notificationType = 'timelineComment';
                notificationReplyType = 'timelineReplyComment';
                break;
            case 'journal':

                break;
            default:
                m.err(500, "Service name doesn't exist.");
        }
        deSecurity.checkUser(targetUserId);
        deSecurity.checkPrivacy(targetUserId);
        data.userId = m.uid();
        data.serviceName = authorCommentData.serviceName;
        data.serviceId = authorCommentData.serviceId;
        data.parentId = parentId;
        data.creationDate = new Date();
        data.replyCommentId = authorCommentData._id;
        deCommentServer.reply(data);
        //make sure that both posts are different author because not need to send twice notification to the same author.
        if(targetUserId != authorCommentData.userId)
        {
            //post a notification for author to read. For photo, timeline or other author
            notificationData = {
                'userId': targetUserId,
                'fromUserId': m.uid(),
                'targetId': authorCommentData.serviceId, //timeline id
                'type': notificationType
            };
            deWebNotification.create(notificationData);
            deNewNotification.reloadNotificationCount(targetUserId);
        }
        console.log('sent notification');
        //post a notification for author to read. For comment author
        var notificationData = {
            'userId': authorCommentData.userId,
            'fromUserId': m.uid(),
            'targetId': authorCommentData.serviceId, //timeline id
            'type': notificationReplyType
        };
        deWebNotification.create(notificationData);
        //reload notification counts
        console.log('reload');
        deNewNotification.reloadNotificationCount(authorCommentData.userId);
    },
    'comment.remove' : function(options){
        var commentItem;
        m.isLogged();
        if (_.isObject(options) !== true)
            m.err(500, 'Parameter must be object.');
        deSecurity.checkUser(m.uid());
        commentItem = deCommentServer.getInfo(options.id);
        switch(commentItem.serviceName){
            case 'photo':
                photoItem = dePhotoServer.getInfo(commentItem.serviceId);
                if (_.isUndefined(photoItem))
                    m.err(500, 'Not found photo id');
                targetUserId = photoItem.userId;
                break;
            case 'timeline':
                timelineItem = deTimelineServer.getItem(commentItem.serviceId);
                if(_.isUndefined(timelineItem))
                    m.err(500, "Not found timeline id");
                targetUserId = timelineItem.userId;
                break;
            case 'journal':
                break;
            default:
                m.err(500, "Service name doesn't exist.");
        }
        if(commentItem.userId === m.uid() || targetUserId === m.uid())
        {
            var data = {'id': options.id};
            deCommentServer.remove(data);
            console.log(commentItem);
            switch(commentItem.serviceName)
            {
                case 'photo':
                    console.log('selected photo');
                    if(commentItem.serviceId && _.has(commentItem, 'parentId') === false)
                        dePhotoServer.updateCommentCount(commentItem.serviceId, -1);
                    break;
                    case 'timeline':
                    if(commentItem.serviceId && _.has(commentItem, 'parentId') === false)
                        deTimelineServer.updateCommentCount(commentItem.serviceId, -1); //REVIEW IF THIS WORKS CORRECTLY WHEN DELETE THEN DECREMENT
                    break;
            }
            return true;
        }else {
            m.err(403, "This is not your comment.");
        }
    }
});
