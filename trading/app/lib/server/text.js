
/*
*/
_text = function(){
    var self = this;
    var Acc_SID = 'XXXX';
    var Auth_token = 'XXXX';
    self.twilioClient = new Twilio({from: '+18662043732',
        sid: Acc_SID, token: Auth_token});
};

_text.prototype.send = function(textNumbers, textMessage){
    var self = this;
    if(typeof textNumbers === 'undefined' || typeof textMessage === 'undefined')
        return;
    console.log('Texting at '+textNumbers)
    try {
        var result = self.twilioClient.sendMMS({
            to: '+'+textNumbers,
            body: textMessage
        }, function(data){
            console.log(data);
        });
    } catch (err) {
        throw new Meteor.Error(err);
    }
};