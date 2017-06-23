/**
 * Created by Justin on 9/7/15.
 */
Meteor.methods({
    'message.send': function (userId, message) {
        m.log('called message.send');
        deSecurity.checkUser(userId);
        deSecurity.checkPrivacy(userId);
        var shortMessage;
        shortMessage = lib.string.short(message, 39);

        /***** BEGIN OF MESSAGE INBOX *****/
        if (m.uid() !== userId) {
            if (deMessageInbox.exists(m.uid(), userId)) {
                deMessageInbox.update(m.uid(), userId, m.uid(), shortMessage, true);
            } else {
                deMessageInbox.create(m.uid(), userId, m.uid(), shortMessage, true);
            }
        }
        var userRoute = deRouter.getUserCurrentRoute(userId);
        var isRead = false;
        if(userRoute.currentRouteName == 'messages' && userRoute.currentRouteUserId == m.uid())
            isRead = true;
        if (deMessageInbox.exists(userId, m.uid())) {
            deMessageInbox.update(userId, m.uid(), m.uid(), shortMessage, isRead);
        } else {
            deMessageInbox.create(userId, m.uid(), m.uid(), shortMessage, isRead);
        }
        /***** END OF MESSAGE INBOX *****/


        /***** BEGING OF MESSAGE *****/
        if (userId == m.uid()) {
            deMessage.create(m.uid(), m.uid(), m.uid(), message);
        } else {
            //Sent to someone
            deMessage.create(userId, m.uid(), m.uid(), message);
            deMessage.create(m.uid(), userId, m.uid(), message);
        }
        /***** END OF MESSAGE *****/


        /***** BEGIN OF NEW NOTIFICATION *****/
        if (m.uid() !== userId) {
            deNewNotification.reloadMessageCount(userId);
        }else{
            m.log('no need to reload message count');
        }
        /***** END OF NEW NOTIFICATION ******/
    },
    'readMessageInbox' : function(messageInboxId){ //NOT DONE
        m.log('readMessageInbox '+messageInboxId);
        if(typeof messageInboxId !== 'undefined')
            co.messageInbox.update({userId: Meteor.userId, _id : messageInboxId}, {$set:{isRead: true}});
    },
    'messageInbox.create' : function(userId){ //NOT DONE
        deSecurity.checkUser(userId);
        deSecurity.checkPrivacy(userId);
        if(deMessageInbox.exists(m.uid(), userId) == false)
            deMessageInbox.create(m.uid(), userId, m.uid(), '', true);
    },
    'messageInbox.remove' : function(data){
        m.log('called messageInbox.remove');
        var messageInboxInfo = deMessageInbox.getInfo(m.uid(), data.id);
        if(_.isObject(messageInboxInfo))
        {
            deMessageInbox.remove(m.uid(), data.id);
            deMessage.removeAll(m.uid(), messageInboxInfo.fromUserId);
        }
    }
});