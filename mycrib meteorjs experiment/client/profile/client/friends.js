"use strict";

Template['yt.userFriends'].events({
    'click .view-friend' : function(e){
        e.preventDefault();
        deModalBox.close(function(){
            Router.go('/'+$(m.ct(e)).attr('data-userid'));
        });
    },
    'click .friend' : function(e){
        e.preventDefault();
        var userId = $(m.ct(e)).attr('data-userid');
        var friendId = $(m.ct(e)).attr('data-friendid');
        if(confirm('Are you sure that you want to delete this?'))
        {
            Meteor.call('friend.remove', userId, friendId);
        }
    },
    'mouseover .friend' : function(e){
        $(m.ct(e)).removeClass('btn-default');
        $(m.ct(e)).addClass('btn-danger');
        m.ct(e).innerHTML = '<i class="fa fa-user-times"></i> Unfriend';
    },
    'mouseout .friend' : function(e){
        $(m.ct(e)).removeClass('btn-danger');
        $(m.ct(e)).addClass('btn-default');
        m.ct(e).innerHTML = '<i class="fa fa-check-circle-o"></i> Friend';
    }
});

Template['yt.userFriends'].helpers({
    'userFriendsData' : function(){
        return Template.instance().userFriendsData();
    },
    'friend' : function(){
        return co.userProfiles.findOne({'userId':this.friendId});
    }
});

Template['yt.userFriends'].rendered = function(){
    var friendsScroll = deInfiniteScroll.create(window, '.friend-container', 50);
    friendsScroll.setLoad(function(){
        if(co.friends.find({'userId' : m.sget('profileUserId')}).count() >= m.sget('friendsLimit'))
            m.sset('friendsLimit', 25 + m.sget('friendsLimit'));
    });
    friendsScroll.start();
    deModalBox.setBeforeClose(function(){m.log('removed friends scroll'); friendsScroll.remove();});
};

Template['yt.userFriends'].onCreated(function () {
    m.log('user friends on created');
    var instance = this;
    m.sset('friendsLimit', 30);
    instance.autorun(function () {
        var subscription = Meteor.subscribe('friend.getFriends', m.sget('profileUserId'), m.sget('friendsLimit'));
        instance.userFriendsData = function () {
            return co.friends.find({'userId': m.sget('profileUserId')}, {limit:m.sget('friendsLimit')});
        };
    });
});