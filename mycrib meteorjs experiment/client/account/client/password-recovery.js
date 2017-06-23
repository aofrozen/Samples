"use strict";

if (Accounts._resetPasswordToken)
    m.sset('resetPassword', Accounts._resetPasswordToken);

Template.passwordRecovery.events({
    'submit #recovery-form' : function(e, t) {
        e.preventDefault();
        var email = t.find('#email-recovery').value;
        if (email) {
            t.find('button').disabled = true;
            t.find('input').disabled = true;
            Accounts.forgotPassword({email: email}, function(err){
                if (err) {
                    t.find('button').disabled = false;
                    t.find('input').disabled = false;
                    sAlert.error(err.reason);
                }else {
                    sAlert.success('Email sent and please check your email.');
                }
            });
        }
        return false;
    },
    'submit #new-password' : function(e, t) {
        e.preventDefault();
        var pw = t.find('#new-password-password').value;
        if (pw) {
            m.sset('loading', true);
            Accounts.resetPassword(m.sget('resetPassword'), pw, function(err){
                if (err)
                    m.sset('displayMessage', 'Password Reset Error. Sorry. '+err);
                else {
                    m.sset('resetPassword', null);
                }
                m.sset('loading', false);
            });
        }
        return false;
    }
});

Template.passwordRecovery.helpers({
    resetPassword : function(t) {
        return m.sget('resetPassword');
    }
});

Template.passwordRecovery.rendered = function(){
    deTitle.set('Password Recovery');
};