/**
 * Created by Justin on 8/23/15.
 */
Template.passwordSettings.events({
    'submit #password-settings-form': function(e, t){
        var username, s, newPassword, verifyPassword, currentPassword;
        e.preventDefault();
        s = $('.submit');
        s.prop('disabled', true);
        currentPassword = Package.sha.SHA256(e.target.currentPassword.value);
        newPassword = e.target.newPassword.value;
        verifyPassword = e.target.verifyPassword.value;
        username = Meteor.user().username;
        if(newPassword === verifyPassword)
        {
            Meteor.call('settings.changePassword', currentPassword, newPassword, function(err, result){
                if(err){
                    $(' input[name=currentPassword]').val('');
                    m.sset('errorMsg', 'Password is incorrect');
                    s.prop('disabled', false);
                }
                if(result){
                    m.sset('errorMsg', null);
                    sAlert.success('Your password is changed');
                    Meteor.loginWithPassword(username, e.target.newPassword.value);
                    $(' input[name=newPassword]').val('');
                    $(' input[name=verifyPassword]').val('');
                    $(' input[name=currentPassword]').val('');
                    s.prop('disabled', false);
                }
            });
        }else{
            m.sset('errorMsg', 'New password and verify password are not match');
            s.prop('disabled', false);
        }
    }
});

Template.passwordSettings.helpers({
    'errorMsg' : function() { return m.sget('errorMsg'); }
});

Template.passwordSettings.rendered = function(){
    m.sset('errorMsg', null);
};