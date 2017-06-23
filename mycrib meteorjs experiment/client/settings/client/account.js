/**
 * Created by Justin on 8/23/15.
 */
Template.accountSettings.events({
    'submit #account-settings-form': function(e){
        e.preventDefault();
        m.log('submit');
        var obj ={};
        obj.fullname = $(' input[name=fullname]').val();
        obj.email = $(' input[name=email]').val();
        obj.username = $(' input[name=username]').val();
        obj.timezone = $(' select[name=timezone]').val();
        Meteor.call('settings.updateAccount', obj, function(err, result){
            if(result)
            {
                sAlert.success('Saved');
            }
            if(err)
            {
                sAlert.error(err);
            }
        });
    }
});

Template.accountSettings.helpers({
    'accountData' : function(){
        return Template.instance().accountData();
    }
});

Template.accountSettings.onCreated(function () {
    var _i = this;
    m.log('oncreated test');
    _i.autorun(function () {
        _i.accountData = function () {
            var user = Meteor.users.findOne({'_id': m.uid()});
            user.email = user.emails[0].address; //only one email!
            return $.extend(user, co.userProfiles.findOne({'userId': m.uid()}));
        };
    });
});