/**
 * Created by Justin on 9/7/15.
 */
Meteor.publish('messages', function(userId){
    console.info('Server: subscribed directMessage '+userId+' and '+this.userId);
    //privacy

    //user exists
    return co.messages.find({userId: this.userId, fromUserId: userId}, {limit: 50, sort: {creationDate: -1}});
});

/*
 Meteor.publish('messageInbox', function(){
 console.info('Server: subscribed messageInbox '+this.userId);
 var messageInbox = collections.messageInbox.find({userId: this.userId}, {limit: 5, sort: {lastMessageDate: -1}});
 if(messageInbox.count() > 0)
 {
 var userIds = messageInbox.map(function(p){return p.fromUserId;});
 return [messageInbox, collections.userProfiles.find({userId:{$in:userIds}}, {fields: {fullname: 1, userId: 1}})];
 }else{
 return messageInbox;
 }

 });*/

Meteor.publishComposite('messageInbox', {
    find: function(){
        return co.messageInbox.find({userId: this.userId}, {limit: 100, sort: {lastMessageDate: -1}});
    },
    children: [
        {
            find: function(messageInbox){
                return co.userProfiles.find({userId: messageInbox.fromUserId}, {fields:{fullname: 1, userId: 1, userAvatar: 1}});
            }
        }
    ]
});