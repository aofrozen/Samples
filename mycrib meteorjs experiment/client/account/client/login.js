"use strict";

Template.login.events({
    'submit #login-form' : function(e, t){
        e.preventDefault();
        var email = t.find('#email').value
            , password = t.find('#password').value;
        Meteor.loginWithPassword(email, password, function(err){
            if (err){
                sAlert.error(err.reason, {timeout:5000});
            }else{
                Meteor.call('account.isAccountReady', function(err, result){
                    switch(result.status)
                    {
                        case 1:
                            Router.go('/i/home');
                            break;
                        case 2:
                            sAlert.error("Your account setup can't be created due to server failed.", {timeout:60000});
                            break;
                    }
                });
            }
        });
        return false;
    }
});

Template.login.rendered = function(){
    deTitle.set('Login');
};