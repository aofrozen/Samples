if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}

co.ticks = new Mongo.Collection('ticks');


sc.ticks = new SimpleSchema({
    'isRunning' : {
        type: Boolean,
        optional: true
    },
    'updatedAt' : {
        type: Date,
        optional: true
    },
    'instrument' : {
        type: String,
        optional: true
    },
    'openBid' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'OBDate' : {
        type: Date,
        optional: true
    },
    'bid' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'BDate' : {
        type: Date,
        optional: true
    },
    'highBid' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'HBDate' : {
        type: Date,
        optional: true
    },
    'lowBid' : {
        type:  Number,
        decimal: true,
        optional: true
    },
    'LBDate' : {
        type: Date,
        optional: true
    },
    'openAsk' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'OADate' : {
        type: Date,
        optional: true
    },
    'ask' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'ADate' : {
        type: Date,
        optional: true
    },
    'highAsk' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'HADate' : {
        type: Date,
        optional: true
    },
    'lowAsk' : {
        type:  Number,
        decimal: true,
        optional: true
    },
    'LADate' : {
        type: Date,
        optional: true
    },
    'openPrice' : {
        type: Number,
        decimal: true,
        optional: true
    }
});

co.ticks.attachSchema(sc.ticks);