if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}

co.pmo = new Mongo.Collection('pmo');


sc.pmo = new SimpleSchema({
    'instrument' : {
        type: String,
        decimal: true
    },
    'updatedAt' : {
        type: Date,
        optional: true
    },
    'side' : {
        type: String,
        optional: true
    },
    'unitPercent' : {
        type: Number,
        decimal: true
    },
    'riskPercent' : {
        type: Number,
        decimal: true
    },
    'takeProfit' : {
        type: Number,
        decimal: true
    },
    'stoploss' : {
        type: Number,
        decimal: true
    },
    'spread' : {
        type: Number,
        decimal: true
    },
    'enableTakeProfitMargin' :{ //It will recalculate coordination when open trade
        type: Boolean,
        optional: true
    },
    'limit' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'startSchedule' : {
        type: Date,
        optional: true
    },
    'endSchedule' : {
        type: Date,
        optional: true
    },
    'enableTrail' : {
        type: Boolean,
        optional: true
    },
    'trailPips' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'takeProfitMinimum' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'leverage' : {
        type: Number
    }
});

co.pmo.attachSchema(sc.pmo);