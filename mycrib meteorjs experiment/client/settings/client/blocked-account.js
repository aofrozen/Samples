/**
 * Created by aofrozen on 8/27/2015.
 */
Template.blockedAccountsSettings.events({
    'click .unblock-btn' : function(e){
        e.preventDefault();
        var userId = $(e.currentTarget).attr('data-id');
        Meteor.call('account.removeBlock', userId, function(err, success){
           if(err)
           {
               sAlert.error(err);
           }
            if(success)
            {
                sAlert.success(success);
            }
        });
    }
});

Template.blockedAccountsSettings.onCreated(function () {
    var _i = this;
    _i.autorun(function () {
        _i.blockAccountsData = function () {
            return co.blockedAccounts.find({'userId': m.uid()});
        };
    });
});

Template.blockedAccountsSettings.helpers({
    'blockAccountsData': function () {
        return Template.instance().blockAccountsData();
    },
    'fullname': function (userId) {
        return co.userProfiles.findOne({'userId': userId}).fullname;
    }
});