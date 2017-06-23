
userProfileIndex = new EasySearch.Index({
    collection: co.userProfiles,
    fields: ['fullname', 'username'],
    engine: new EasySearch.Minimongo()
});

Template.messages.events({
    'submit form': function (e) {
        e.preventDefault();
        var messageEl = $('#message');
        if (e.target.message.value !== '') {
            messageEl.attr('disabled', true);
            Meteor.call('message.send', m.sget('messageUserId'), e.target.message.value, function (err, result) {
                messageEl.val('');
                messageEl.attr('disabled', false);
                messageEl.focus();
                if(err)
                {
                    sAlert.error(err);
                }
            });
        }
    },
    'keyup .inbox-search' : function(e){
        console.log(e.target.value);
        Session.set('search', e.target.value);
    },
    'click .send-message' : function(e){
        e.preventDefault();
        var messageEl = $('#message');
        if (messageEl.val() !== '') {
            messageEl.attr('disabled', true);
            Meteor.call('message.send', m.sget('messageUserId'), messageEl.val(), function (err, result) {
                    messageEl.val('');
                    messageEl.attr('disabled', false);
                    messageEl.focus();

                if(err)
                {
                    sAlert.error(err);
                }
            });
        }
    },
    'click .small-list-item': function (e) {
        e.preventDefault();
        if(typeof m.sget('_viewMessageInbox') === 'undefined')
            m.sset('_viewMessageInbox', true);
        Meteor.setTimeout(function(){
            if(m.sget('_viewMessageInbox') === true)
            {
                Meteor.call('readMessageInbox', $(e.currentTarget).attr("data-id"));
                m.sset('messageUserId', $(e.currentTarget).attr("data-userid"));
                Meteor.call('updateUserCurrentRoute', {
                    currentRouteName: 'messages',
                    currentRouteUserId: m.sget('messageUserId'),
                    currentRouteEventId: ''
                });
            }else{
                m.sset('_viewMessageInbox', true);
            }
        }, 100);
        //Router.go('/messages/'+$(e.currentTarget).attr("data-userid"));
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
        var data = { 'id' : $(e.currentTarget).attr('data-id') };
        m.sset('_viewMessageInbox', false);
        if(confirm('Are you sure you want to remove this?'))
        {
            Meteor.call('messageInbox.remove', data, function(err, result){
                if(err)
                    sAlert.error(err);
            });
            return false;
        }
    },
    'click .user': function (e) {
        e.preventDefault();
        deModalBox.close(function () {
            Router.go('/' + $(e.currentTarget).attr('data-userid'));
        });
    }
});

Template.messages.helpers({
    'banded' : function(){
        if(this.userId === this.saidUserId)
        {
            return 'from-user';
        }else{
            return 'to-user';
        }
    },
    'messages': function () {
        return Template.instance().messages();
    },
    'messageInbox': function () {
        return Template.instance().messageInbox();
    },
    'sentMessageDate': function(){
        return moment(this.creationDate).calendar();
    },
    'fromUser': function () {
        return co.userProfiles.findOne({'userId': this.fromUserId});
    },
    'userSaid': function () {
        return co.userProfiles.findOne({'userId': this.saidUserId});
    },
    'isMe' : function(userId){
        return m.uid() == userId;
    },
    'lastLoad' : function(){
        Meteor.setTimeout(function(){
            $('.chat').scrollTop($('.chat')[0].scrollHeight);
            x=0;
        }, 150);
    },
    'isActiveMessageInbox' : function(){
        if(this.fromUserId == m.sget('messageUserId'))
            return 'active';
        return '';
    },
    'isMessageLoaded' : function(){
        return Template.instance().messageLoaded.get();
    },
    'isInboxLoaded' : function(){
        return Template.instance().inboxLoaded.get();
    }
});

Template.messages.onCreated(function(){
    Meteor.call('updateUserCurrentRoute', {
        currentRouteName: 'messages',
        currentRouteUserId: m.sget('messageUserId'),
        currentRouteEventId: ''
    });
    Meteor.call('resetNewMessageCount');
    Meteor.call('messageInbox.create', m.sget('messageUserId'), function(err, result){
        if(err)
            sAlert.error(err);
    });
/*
    $(window).resize(function(){
        if($(window).width() > 480)
        {
            $('.chat').height($('.direct-message').height()-75);
        }else{
            $('.chat').height($('.direct-message').height()-165); //due to margin top
        }
    });*/

    var instance = this;
    instance.messageLoaded = new ReactiveVar(false);
    instance.inboxLoaded = new ReactiveVar(false);
    instance.limit = new ReactiveVar(20);
    instance.messageUserId = new ReactiveVar(m.sget('messageUserId'));

    instance.autorun(function(){
        _inboxSub = Meteor.subscribe('messageInbox');
        _messageSub = Meteor.subscribe('messages', m.sget('messageUserId'));

        instance.messageLoaded.set(_messageSub.ready());
        instance.inboxLoaded.set(_inboxSub.ready());

        instance.messageInbox = function() {
            if(typeof Session.get('search') !== 'undefined' && Session.get('search') !== '')
            {
                var users = _.map(userProfileIndex.search(Session.get('search')).fetch(), function(data){return data.userId;});
                return co.messageInbox.find({'userId' : m.uid(), 'fromUserId' : {$in: users}}, {sort: {lastMessageDate: -1}});
            }else{
                return co.messageInbox.find({'userId' : m.uid()}, {sort: {lastMessageDate: -1}});
            }
        };
        instance.messages = function() { return co.messages.find({'userId' : m.uid(), 'fromUserId' : m.sget('messageUserId')}, {sort: {creationDate: 1}}); };
    });
});


Template.messages.rendered = function (){
    /*Meteor.setTimeout(function(){
        if($(window).width() > 480)
        {
            $('.chat').height($('.direct-message').height()-75);
        }else{
            $('.chat').height($('.direct-message').height()-165); //due to margin top
        }
    }, 100);*/
    if(typeof deEmoji === 'object')
    deEmoji.init('input[type=text]');
    console.log('rendered');
};
