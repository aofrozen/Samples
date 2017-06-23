Accounts.validateNewUser(function (user) {
    if (_.isString(user.username) && user.username.length < 3)
    {
        m.err(403, "Username must have at least 3 characters");
    }
    var re = /[^a-zA-B]/;
    if(re.test(user.username))
    {
        m.log("special characeters are illegal");
        m.err(403, "Username accepts only alphabet.");
    }

    return true;

});
