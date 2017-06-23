transactions = function(){};

transactions.prototype.write = function(data){
    /*
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
    //takeProfitPrice
    //stopLossPrice
    var d = {
        'id' : data.id,
        'accountId' : data.accountId,
        'time' : data.time,
        'type' : data.type,
        'instrument' : data.instrument,
        'units' : data.units,
        'side' : data.side,
        'price' : data.price,
        'pl' : data.pl,
        'interest' : data.interest,
        'accountBalance' : data.accountBalance
    };
    co.transactions.insert(d);
};