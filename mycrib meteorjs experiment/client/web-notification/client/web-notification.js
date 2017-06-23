Template.webNotifications.events({
    //Friend
   'click .accept-friend-request' : function(e){
       e.preventDefault();
       Meteor.call('acceptFriendRequest', $(e.currentTarget).attr('data-id'), function(err, result){

       });
   },
    'click .reject-friend-request': function(e){
        e.preventDefault();
        Meteor.call('rejectFriendRequest', $(e.currentTarget).attr('data-id'), function(err, result){

        });
    },
    'click .view-friend' : function(e){
        e.preventDefault();
        Router.go('/'+$(e.currentTarget).attr('data-userid'));
    },
    'mouseover .small-list-item': function(e){
        e.preventDefault();
        $(e.currentTarget.querySelector('#remove-item')).removeClass('hidden');
    },
    'mouseout .small-list-item' : function(e){
        e.preventDefault();
        $(e.currentTarget.querySelector('#remove-item')).addClass('hidden');
    },
    'click #remove-item' : function(e){
        e.preventDefault();
        m.sset('webNotification.trash', true);
        var notificationId = $(e.currentTarget).attr('data-id');
        if(_.isString(notificationId))
            Meteor.call('deleteWebNotification', notificationId);
    },
    'click .photo-comment-btn' : function(e){
        e.preventDefault();
        Meteor.setTimeout(function(){
            if(m.sget('webNotification.trash') === false)
            {
                ///event-comments/{eventinstanced}/{commentId}/{who}
                Meteor.call('readWebNotification', $(e.currentTarget).attr('data-notification-id'), function(err, success){

                });
                Session.set('hash', $(e.currentTarget).attr('data-id'));
                Router.go('/'+m.uid()+'/allphotos#'+$(e.currentTarget).attr('data-id'));
            }else {
                m.sset('webNotification.trash', false);
            }
        }, 30);
    },
    'click .timeline-comment-btn' : function(e){
        e.preventDefault(e);
        Meteor.setTimeout(function(){
            if(m.sget('webNotification.trash') === false)
            {
                    ///event-comments/{eventinstanced}/{commentId}/{who}
                    Meteor.call('readWebNotification', $(e.currentTarget).attr('data-notification-id'), function(err, success){

                    });
                    Router.go('/i/timeline/'+$(e.currentTarget).attr('data-id'));
            }else {
                m.sset('webNotification.trash', false);
            }
        }, 30);
    },
    'click .profile-comment-btn' : function(e){
        e.preventDefault();
        Meteor.setTimeout(function(){
            if(m.sget('webNotification.trash') === false)
            {
                ///event-comments/{eventinstanced}/{commentId}/{who}
                Meteor.call('readWebNotification', $(e.currentTarget).attr('data-notification-id'), function(err, success){

                });
                Router.go('/'+$(e.currentTarget).attr('data-id'));
            }else {
                m.sset('webNotification.trash', false);
            }
        }, 30);
    }
});


Template.webNotifications.helpers({
    'webNotifications' : function(){
        return Template.instance().webNotificationsData();
    },
    'isFriendRequest' : function(){
        return this.type === 'friendRequest';
    },
    'isPhotoComment' : function(){
        return this.type === 'photoComment';
    },
    'isTimelineComment' : function(){
        return this.type === 'timelineComment';
    },
    'isTimelineReplyComment' : function(){
        return this.type === 'timelineReplyComment';
    },
    'isProfileComment' : function(){
        return this.type === 'profileComment';
    },
    'eventLink' : function(){
        return "<a href='/event/"+this.targetId+"'>this event.</a>";
    },
    'webNotificationsExist' : function(){
        return Template.instance().webNotificationsData().count() > 0;
    }
});

Template.webNotifications.rendered = function(){
    m.log('rendered rendered');
    var webNotificationsScroll = deInfiniteScroll.create('.web-notifications-container', '.web-notifications-container', 50);
    m.sset('webNotification.trash', false);
    webNotificationsScroll.setLoad(function() {
        if (co.notifications.find({'userId': m.uid()}).count() >= m.sget('webNotificationsLimit'))
            m.sset('webNotificationsLimit', 10 + m.sget('webNotificationsLimit'));
    });
    webNotificationsScroll.start();
};


Template.webNotifications.onCreated(function(){
    var instance = this;
    m.sset('webNotificationsLimit', 10);
    instance.autorun(function(){
        Meteor.subscribe('webNotifications', m.sget('webNotificationsLimit'));
        instance.webNotificationsData = function(){ return co.notifications.find({'userId' : m.uid()}, {sort: {'creationDate': -1}, limit: m.sget('webNotificationsLimit')}); };

    });
});
