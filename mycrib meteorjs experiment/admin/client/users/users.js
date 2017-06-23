/**
 * Created by Justin on 11/29/15.
 */
Template.adminUsers.helpers({
   'users' : function(){
       return Template.instance().allUsers();
   }
});

Template.adminUsers.events({
   'click .set-safe-account-btn' : function(e)
   {
       e.preventDefault();
       Meteor.call('admin.updateSafeUser', $(e.currentTarget).attr('data-id'), function(err, success){

       });
   },
    'click .disable-account-btn' : function(e)
    {
        e.preventDefault();
    }
});

Template.adminUsers.onCreated(function(){
   var instance = this,
       rows = 100;
    instance.autorun(function(){
        Meteor.subscribe('admin.getAllUsers', rows);
        instance.allUsers = function(){
            return co.userProfiles.find({}, {sort:{creationDate: -1}, limit: rows});
        }
    });
});