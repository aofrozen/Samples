if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}
/*
 MARKET_ORDER_CREATE
 MARGIN_CALL_ENTER
 MARGIN_CLOSEOUT
 MARGIN_CALL_EXIT
 TRADE_CLOSE
 ORDER_UPDATE
 TAKE_PROFIT_FILLED

 MARKET_ORDER_CREATE, STOP_ORDER_CREATE, LIMIT_ORDER_CREATE, MARKET_IF_TOUCHED_ORDER_CREATE,
 ORDER_UPDATE, ORDER_CANCEL, ORDER_FILLED, TRADE_UPDATE, TRADE_CLOSE, MIGRATE_TRADE_OPEN,
 MIGRATE_TRADE_CLOSE, STOP_LOSS_FILLED, TAKE_PROFIT_FILLED, TRAILING_STOP_FILLED, MARGIN_CALL_ENTER,
 MARGIN_CALL_EXIT, MARGIN_CLOSEOUT, TRANSFER_FUNDS, DAILY_INTEREST, FEE

 { transaction:
 I20161012-14:33:23.493(-7)?    { id: 10468375891,
 I20161012-14:33:23.493(-7)?      accountId: 9564840,
 I20161012-14:33:23.494(-7)?      time: '2016-10-12T21:33:23.000000Z',
 I20161012-14:33:23.494(-7)?      type: 'MARKET_ORDER_CREATE',
 I20161012-14:33:23.494(-7)?      instrument: 'GBP_USD',
 I20161012-14:33:23.494(-7)?      units: 1,
 I20161012-14:33:23.494(-7)?      side: 'buy',
 I20161012-14:33:23.494(-7)?      price: 1.22067,
 I20161012-14:33:23.494(-7)?      pl: 0,
 I20161012-14:33:23.495(-7)?      interest: 0,
 I20161012-14:33:23.495(-7)?      accountBalance: 792.3338,
 I20161012-14:33:23.495(-7)?      tradeOpened: { id: 10468375891, units: 1 } } }
*/
 co.transactions = new Mongo.Collection('transactions');
        sc.transactions = new SimpleSchema({
        'accountId' : {
            type: Number
        },
            'time' : {
                type: Date
            },
            'type' : {
                type: String
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
            'pl' : {
                type: Number,
                decimal: true,
                optional: true
            },
            'interest' : {
                type: Number,
                decimal: true,
                optional: true
            },
            'accountBalance' : {
                type: Number,
                decimal: true,
                optional: true
            }
 });
/*
 'currencyPair' : {
 type: String
 },
 'transaction' : {
 type: String
 },
 'price' : {
 type: Number,
 decimal: true
 },
 'PL' : {
 type: Number,
 decimal: true
 },
 'stopLossPips' : {
 type: Number,
 decimal: true
 },
 'takeProfitPips' : {
 type: Number,
 decimal: true
 },
 'units' : {
 type: Number
 },
 'riskPercent' : {
 type: Number,
 decimal: true
 },
 'unitPercent' : {
 type: Number,
 decimal: true
 }
 */
co.transactions.attachSchema(sc.transactions);