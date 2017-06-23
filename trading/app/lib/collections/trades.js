if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}

co.trades = new Mongo.Collection('trades');


sc.trades = new SimpleSchema({
    'tradeId' : {
        type: Number
    },
    'time' : {
        type: Date
    },
    'instrument' : {
        type: String,
        optional: true
    },
    'units' : {
        type: Number,
        optional: true
    },
    'side' : {
        type: String,
        optional: true
    },
    'price' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'takeProfit' : {
        type: Number,
        decimal: true,
        optional: true
    },
    'stoploss' : {
        type: Number,
        decimal: true,
        optional: true
    }
});

co.trades.attachSchema(sc.trades);