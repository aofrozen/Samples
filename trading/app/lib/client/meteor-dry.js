
m = {
    'call': function (name, d, callback) {
        Meteor.call(name, d, function (err, success) {
            if(typeof callback == 'function')
            {
                callback(err, success);
            }else{
                if (err)
                    sAlert.error(error);
                if (success)
                    sAlert.success(success);
            }
        });
    },
    'err': function (code, reason, details) {
        if(typeof details === 'undefined')
            details = '';
        throw new Meteor.Error(code, reason, details);
    },
    'uid' : function(){
        return Meteor.userId();
    },
    'log' : function(d){
        console.log(d);
    },
    'sget' : function(name){
        return Session.get(name);
    },
    'sset' : function(name,d){
        return Session.set(name,d);
    },
    'ct' : function(e){
        if(typeof e !== 'undefined')
            return e.currentTarget;
        return e;
    },
    'isLogged' : function(){
        if(!this.uid())
            m.err(500, 'Required to log in.');
    }
};

/*
 References

 d = data
 r = result

 _i = instance

 co = collection

 sc = schema

 Error list will reduce typing error repeatly


 */