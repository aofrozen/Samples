/**
 * Created by Justin on 11/25/15.
 */
Template.newUsers.onCreated(function(){
    var instance = this;
    Meteor.subscribe('profile.getNewProfiles');
    instance.newUsers = function(){
        return co.userProfiles.find({}, {sort:{'creationDate': -1}, limit: 50});
    };
});

Template.newUsers.helpers({
    'users' : function(){
        return Template.instance().newUsers();
    }
});

Template.newUsers.events({
    'click .user-profile-btn' : function(e){
        e.preventDefault();
        console.log('clicked user profile btn');
        Router.go('/'+$(e.currentTarget).attr('data-id'));
    }
});
