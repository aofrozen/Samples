
/**
 * EVENTS
 */

Template.messageInbox.events({
   'click .small-list-item' : function(e){
       Meteor.call('readMessageInbox', $(e.currentTarget).attr("data-id"));
       m.sset('messageUserId', $(e.currentTarget).attr("data-userid"));
       deModalBox.open('messages', '', {'width' : '100%', 'max-width' : '900px', 'padding' : '0px'});
       //Router.go('/messages/'+$(e.currentTarget).attr("data-userid"));
   },
    'mouseover .small-list-item': function(e){
        e.preventDefault();
        $(e.currentTarget.querySelector('#remove-item')).removeClass('hidden');
    },
    'mouseout .small-list-item' : function(e){
        e.preventDefault();
        $(e.currentTarget.querySelector('#remove-item')).addClass('hidden');
    }
});

/**
 * HELPERS
 */

Template.messageInbox.helpers({
    'messageInbox' : function(){
        return Template.instance().messageInbox();
    },
    'fromUser': function () {
        return co.userProfiles.findOne({'userId': this.fromUserId});
    },
    'messageInboxExists' : function(){
        return Template.instance().messageInbox().count() > 0;
    }
});

/**
 * ONCREATED
 */

Template.messageInbox.onCreated(function(){
    var instance = this;
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(20);
    Meteor.call('updateUserCurrentRoute', {
        currentRouteName: 'messageInbox',
        currentRouteUserId: '',
        currentRouteEventId: ''
    });
    Meteor.call('resetNewMessageCount');
    Meteor.subscribe('messageInbox');
    instance.autorun(function(){
        var limit = instance.limit.get();
        instance.messageInbox = function() { return co.messageInbox.find({}, {sort: {lastMessageDate: -1}}); };
    });
});