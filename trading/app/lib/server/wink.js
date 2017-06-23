wink = function(accessToken, refreshToken) {
    var self = this;
    self.isReady = false;
    self.light = {};
    if (typeof accessToken === 'undefined' || typeof accessToken === 'undefined')
    {

    }else{
        self._wink = Meteor.npmRequire('wink-js');
        self._wink.init({
            "client_id": 'XXX',
            "client_secret": 'XXX',
            'username' : 'XXX',
            'password' : 'XXX'
        }, function(auth_return) {
            if ( auth_return === undefined ) {
                // error
                console.log("Failed to connect wink ");
                self.isReady = true;
            } else {
                // success
                console.log(auth_return);
                self.isReady = true;
                console.log("Connected wink");
            }
        });
/*
        self._wink = WinkAPI = Meteor.npmRequire('node-winkapi');
        var clientID     = 'LlwH7tsg-tz7IXZOt9BB_zDzb3isNYuH'
            , clientSecret = 'CqZ0tcOeNubF0XR3rE_bv0ihR19hweH0'
            , userName     = 'scvjustin@gmail.com'
            , passPhrase   = 'Jclt686889!'
            , winkapi
            ;

        winkapi = new self._wink.WinkAPI({ clientID     : clientID
            , clientSecret : clientSecret }).login(userName, passPhrase, function(err) {
            if (!!err) return console.log('login error: ' + err.message);
            console.log('connected wink!!!');
            self.isReady = true;
            // otherwise, good to go!
        }).on('error', function(err) {
            console.log('background error: ' + err.message);
        });*/
    }
};

wink.prototype.selectLight = function(name, callback)
{
    var self = this;
    console.log(self._wink);
    if(self.isReady == false)
        callback(false);
    if(typeof name === 'undefined')
        callback(false);
    console.log('selecting light is '+name);
    console.log(self._wink);
    self._wink.user().device(name, function(data){
        console.log(data);
        if(typeof data !== 'undefined')
        {
            self.light = data['power'];
            callback(data);
        }else{
            callback(false);
        }
    })
};

wink.prototype.on = function(){
    var self = this;
    self.light.on(function(data){
    });
};

wink.prototype.off = function(){
    var self = this;
    self.light.off(function(data){
    });
};