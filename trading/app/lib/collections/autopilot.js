if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}

co.autopilot = new Mongo.Collection('autopilot');


sc.autopilot = new SimpleSchema({
    createdAt : {
        type: Date
    },
    isRun : {
        type: Boolean,
        optional: true
    },
    instrument : {
        type: String
    },
    startUpperPrice : {
        type: Number,
        optional: true,
        decimal: true
    },
    endUpperPrice : {
        type: Number,
        optional: true,
        decimal: true
    },
    startLowerPrice : {
        type: Number,
        optional: true,
        decimal: true
    },
    endLowerPrice : {
        type: Number,
        optional: true,
        decimal: true
    },
    side : {
        type: String,  //Sell and Buy
        optional: true
    },
    profitAction: {
        type: String, //Trade, Close or Free
        optional: true
    },
    openTrade : {
        type: Boolean, //is it still open trade or not?
        optional: true
    },
    stoplossMarginPips: {
        type: Number,
        optional: true
    },
    startDate: {
        type: Date,
        optional: true
    },
    endDate: {
        type: Date,
        optional: true
    }
});

co.autopilot.attachSchema(sc.autopilot);