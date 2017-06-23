alarms = function () {
    var self = this;
    self._textStatus = null;
    self.winkStatus = null;
    self._text = new _text();
    self._wink = new wink('XXXX', 'XXXX');
};

alarms.prototype.create = function (alarm) {
    console.log(alarm);
    alarm['createdAt'] = new Date();
    alarm['alarmAttemptCount'] = 0;
    alarm['lastAlarmAttemptAt'] = new Date();
    co.alarms.insert(alarm);
};

alarms.prototype.remove = function (alarmID) {
    co.alarms.remove({'_id': alarmID});
};

alarms.prototype.change = function (alarm) {
    console.log(alarm);
    co.alarms.update({'_id': alarm['_id']}, {$set: alarm});
};

alarms.prototype.enable = function (alarmID) {
    co.alarms.update({'_id': alarmID}, {$set: {'isEnabled': true}});
};

alarms.prototype.disable = function (alarmID) {
    co.alarms.update({'_id': alarmID}, {$set: {'isEnabled': false}});
};

alarms.prototype.reset = function (alarmID) {
    var self = this;
    var alarmItem = co.alarms.find({'_id': alarmID}).fetch();
    co.alarms.update({'_id': alarmID}, {$set: {'alarmAttemptCount': 0, 'isTouched': false}});
    self._wink.selectLight(alarmItem[0]['lightName'], function (data) {
        if (data !== false)
            self._wink.off();
    });
};

alarms.prototype.test = function (alarmID) {
    var self = this;
    var alarmItem = co.alarms.find({'_id': alarmID}).fetch();
    self.touched(alarmID);
    if (alarmItem[0]['isLightEnabled']) {
        self._wink.selectLight(alarmItem[0]['lightName'], function (data) {
            if (data !== false)
                self._wink.on();
        });
    }

    if (alarmItem[0]['isTextEnabled']) {
        self._text.send(alarmItem[0]['textNumbers'], alarmItem[0]['textMessage']);
    }
};

alarms.prototype.updateAlarmCount = function (alarmID) {
    var d = new Date();
    co.alarms.update({'_id' : alarmID}, {$inc:{'alarmAttemptCount':1}, $set:{'alarmUpdatedAt' : d}}); //increase count and update last

};

alarms.prototype.touched = function (alarmID) {
    co.alarms.update({'_id': alarmID}, {$set: {'isTouched': true}});
};
alarms.prototype.tick = function (tick) {
    console.log('Alarm Ticks');
    console.log(tick);
    /*
     1. Cycle of alarm update
     2. Check if price position meets price action
     3. Check enabled alarm options
     4. Prepare wink and text for signal
     */
    var self = this;
    var price = tick['ask'];
    var alarmItems = co.alarms.find({'isEnabled': true}).fetch();
    var d = new Date().getTime();
    //Check if price position is touched or not
    alarmItems.forEach(function (key, value) {
        if (key['priceRangeDirection'] == 'g') {
            if (key['pricePosition'] < price) {
                //Touch
                self.touched(key['_id']);
            }
        } else if (key['priceRangeDirection'] == 'l') {
            if (key['pricePosition'] > price) {
                //Touch
                self.touched(key['_id']);
            }
        }

        //Alarm
        if (key['isTouched'] == true) {
            if (key['alarmAttemptCount'] < key['alarmAttemptMax'] && ((d - key['alarmUpdatedAt'].getTime()) > key['alarmAttemptDuration']*1000))
            {
                //get ready for alarm and update alarm attempt count
                //Good to go
                if (key['isLightEnabled'] === true) {
                    console.log('Turning light on now!');
                    self._wink.selectLight(key['lightName'], function (data) {
                        if (data !== false)
                            self._wink.on();
                    });

                    self.updateAlarmCount(key['_id']);
                }
                if (key['isTextEnabled'] === true) {
                    console.log('Texting now');
                    self._text.send(key['textNumbers'], key['textMessage']);
                }
            }else{
                console.log('Not trigger alarm due to they dont meet');
                console.log(key['alarmAttemptCount'] < key['alarmAttemptMax']);
                console.log(((d -(key['alarmAttemptDuration']*1000)) > key['alarmUpdatedAt'].getTime()));
                console.log((d - key['alarmUpdatedAt'].getTime()));
            }
        }
    });


};