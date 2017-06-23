if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}

co.alarms = new Mongo.Collection('alarms');


sc.alarms = new SimpleSchema({
    'createdAt' : {
        type: Date
    },
    'isTouched' : { //it is designed to not stop alarm when price is touched once.
        type: Boolean,
        optional: true
    },
    'isEnabled' : {
        type: Boolean
    },
    'alarmName' : {
        type: String,
        optional: true
    },
    'instrument' : {
        type: String
    },
    'pricePosition' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'priceRangeDirection' : {
        type: String,
        optional: true
    },
    'alarmAttemptMax' : {
        type: Number,
        optional: true
    },
    'alarmAttemptDuration' : {
        type: Number,
        optional: true
    },
    'alarmAttemptCount' : {
        type: Number,
        optional: true
    },
    'alarmUpdatedAt' : {
        type: Date,
        optional: true
    },
    'isTextEnabled' : {
        type: Boolean,
        optional: true
    },
    'textNumbers' : {
        type: String,
        optional: true
    },
    'textMessage' : {
        type: String,
        optional: true
    },
    'isLightEnabled' : {
        type: Boolean,
        optional: true
    },
    'lightName' : {
        type: String,
        optional: true
    }
});

co.alarms.attachSchema(sc.alarms);