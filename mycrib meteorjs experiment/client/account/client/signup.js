Template.register.events({
    'submit #register-form' : function(e, t) {
        e.preventDefault();
        var email = t.find('input[name="email"]').value
            , password = t.find('input[name="password"]').value,
            username = t.find('input[name="username"]').value,
            fullname = t.find('input[name="fullname"]').value,
            day = parseInt(t.find('#day option:selected').value),
            month = t.find('select[name="month"]').value,
            year = parseInt(t.find('#year option:selected').value),
            gender = t.find('input[name="gender"]:checked').value,
            captchaData = grecaptcha.getResponse(),
            registerData = {'email' : email,
            'password' : password,
            'username' : username,
            'fullname' : fullname,
            'day' : day,
            'month' : month,
            'year' : year,
            'gender' : gender};
        m.log('submit register form');
        Meteor.call('account.register', registerData, captchaData, function(err, success){
            grecaptcha.reset();
            if(err)
            {
                sAlert.error(err);
            }
            if(success == true)
            {
                Meteor.loginWithPassword(email, password, function(err){
                    if (err){
                        m.err(500, err.reason);
                    }else{
                        Meteor.call('account.isAccountReady', {'fullname' : fullname, 'month' : month, 'day' : day, 'year' : year, 'gender' : gender}, function(err, result){
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
            }
        });

        return false;
    }
});

Template.register.rendered = function(){
  deTitle.set('Register');
};

Template.register.helpers({
   'years' : function(){
       var yearCount = 110,
           currentYear = new Date().getFullYear()-1,
           years = [],
           x;
       for(x=0;x<yearCount;x++)
       {
           years[x] = [];
           years[x]['year'] = currentYear - x;
       }
       return years;
   }
});
