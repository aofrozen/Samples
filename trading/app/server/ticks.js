/*
 ______   __                 ________                        __
 /      \ /  |               /        |                      /  |
 /$$$$$$  |$$ |   __  __    __$$$$$$$$/______   ______    ____$$ |  ______    ______
 $$ \__$$/ $$ |  /  |/  |  /  |  $$ | /      \ /      \  /    $$ | /      \  /      \
 $$      \ $$ |_/$$/ $$ |  $$ |  $$ |/$$$$$$  |$$$$$$  |/$$$$$$$ |/$$$$$$  |/$$$$$$  |
 $$$$$$  |$$   $$<  $$ |  $$ |  $$ |$$ |  $$/ /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/
 /  \__$$ |$$$$$$  \ $$ \__$$ |  $$ |$$ |     /$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |
 $$    $$/ $$ | $$  |$$    $$ |  $$ |$$ |     $$    $$ |$$    $$ |$$       |$$ |
 $$$$$$/  $$/   $$/  $$$$$$$ |  $$/ $$/       $$$$$$$/  $$$$$$$/  $$$$$$$/ $$/
 /  \__$$ |
 $$    $$/
 $$$$$$/
 */

_account_type = 'live';
if(_account_type === 'live')
{
    console.log("LIVE ACCOUNT!");
    access_token = 'XXXX';
    account_id = 'XXXX';
    domain = 'stream-fxtrade.oanda.com';
    domainAPI = 'api-fxtrade.oanda.com';
}else{
    console.log("PRACTICE ACCOUNT");
    access_token = 'XXXX';
    account_id = 'XXXX';
    domain = 'stream-fxpractice.oanda.com';
    domainAPI = 'api-fxpractice.oanda.com';
}

/*
 AC3f0799f9f70e253ea970a5932c2e799f

 4a6a015ab06892e1be5690f71b0f2f2f
 */
console.log('loading ticks');
var Fiber = Meteor.npmRequire('fibers');
var process = Meteor.npmRequire('process');
var oandaAPI = new oanda();
var t = new transactions();
var tt = new ticks();
var aa = new alarms();
var ap = new autopilot();
// Replace the following va

//Friend b9941c3a28b9868b7df1d41a99720ec7-aa9c1968b88371fec40f220ebdc0405a



oandaAPI.subscribeEvents(function (event) {
    console.log(event);
    Fiber(function () {
        if (typeof event.transaction !== 'undefined') {
            console.log('wrote');
            t.write(event.transaction);

        }
    }).run();
});


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


 I20161012-14:34:12.100(-7)? { transaction:
 I20161012-14:34:12.100(-7)?    { id: 10468376249,
 I20161012-14:34:12.100(-7)?      accountId: 9564840,
 I20161012-14:34:12.100(-7)?      time: '2016-10-12T21:34:12.000000Z',
 I20161012-14:34:12.101(-7)?      type: 'TRADE_CLOSE',
 I20161012-14:34:12.101(-7)?      instrument: 'GBP_USD',
 I20161012-14:34:12.101(-7)?      units: 1,
 I20161012-14:34:12.101(-7)?      side: 'sell',
 I20161012-14:34:12.101(-7)?      price: 1.21972,
 I20161012-14:34:12.101(-7)?      pl: -0.001,
 I20161012-14:34:12.102(-7)?      interest: 0,
 I20161012-14:34:12.102(-7)?      accountBalance: 792.3328,
 I20161012-14:34:12.102(-7)?      tradeId: 10468375891 } }
 */
//Me
//var access_token = '5c239694a61ec05260665d3ac9aad1fc-2f901971fe7864a24d938a98c6b69bcf';
//var account_id = '9564840';

// Up to 10 instruments, separated by URL-encoded comma (%2C)

var https;
var tickCount = 0;

if (domain.indexOf("stream-sandbox") > -1) {
    https = Meteor.npmRequire('http');
} else {
    https = Meteor.npmRequire('https');
}
var end, start;
var pairs = ['EUR_USD'];
var instruments = pairs.join('%2C');
var options = {
    host: domain,
    path: '/v1/prices?accountId=' + account_id + '&instruments=' + instruments,
    method: 'GET',
    headers: {"Authorization": "Bearer " + access_token}
};

var request;

var updateOpen = function(instrument){
    oandaAPI.getCandles(instrument, new Date().getTime()-(60*60*25*1000), new Date().getTime()*1000, 'H1', function(error, success){
        var t = new Date();
        var y = new Date(t);
        var highBid = 0;
        var lowBid = 9999;
        var highAsk = 0;
        var lowAsk = 9999;
        var lowV, highV;
        var f = new forex();
        //console.log(success);
        t.setUTCHours(21,0,0,0); //It is standard forex time
        if(t.getTime() > y.getTime())
        {
            //Get yesterday
            t.setDate(t.getDate()-1);
        }
        success.forEach(function(value, index){
            var d = new Date(value['time']*0.001);
            var highBidC = value['highBid'];
            var lowBidC = value['lowBid'];
            var highAskC = value['highAsk'];
            var lowAskC = value['lowAsk'];
            if(t.getTime() <= d.getTime())
            {
                //console.log('close to find'+index);
               // console.log(d);
                //console.log(t);
                if(t.getTime() == d.getTime())
                {
                   // console.log("First open is found.");
                   // console.log(instrument);
                    //console.log(value);
                    Fiber(function () {
                        tt.updateOpen(instrument, value)
                    }).run();
                }else{
                  //  console.log('This is used for HL');
                    if(highBid < highBidC)
                    {
                        highBid = highBidC;
                        highV = value;
                    }
                    if(lowBid > lowBidC)
                    {
                        lowBid = lowBidC;
                        lowV = value;
                    }
                }
            }
        });

        Fiber(function () {
            //tt.updateOpenPrice();
            var openPrice = f.getDay(instrument.replace('_', ''));
            tt.updateOpenPrice(instrument, openPrice['data']['bars'][0]['o']);
            tt.updateLowHigh(instrument, lowV, highV);
        }).run();
        //21:00:00 (GMT 0)  or 14:00:00 (GMT -7)= 2PM for monday
        //
        console.log(error);

        /*
         Oanda is different time (8PM Oanda = 1PM Forexfactory [PST])
         */
    });
};
var lastDate;
var writeHistory = function(forex){
    start = new Date();
    Fiber(function () {
        var count = forex.length, x;
        //console.log('Forex data count: '+count);
        var JSONData = {};
        end = new Date() - start;
        //console.info("(Before) Execution time: %dms", end);
        for (x = 0; x < count; x++) {
            if (forex[x] !== '' && typeof forex[x] !== 'undefined') {
                JSONData = JSON.parse(forex[x]);
                if (typeof JSONData.tick !== 'undefined' && typeof JSONData.tick.instrument !== 'undefined') {
                   // console.log(JSONData);
                    var t = new Date();
                    /*
                     Needs to fix day if not touch 21:00 then back to yesterday
                     */
                    var b = t;
                    var y = new Date(t);
                    t.setUTCHours(21,0,0,0); //It is standard forex time
                    if(t.getTime() >= y.getTime())
                    {
                        //Get yesterday
                        t.setDate(t.getDate()-1);
                    }
                    if(t.getTime() <= b.getTime() && lastDate != t.getTime())
                    {

                        console.log(lastDate);
                        console.log(t.getTime());
                        //Ready to update
                        lastDate = t.getTime();
                        console.log("Updating OLH");
                        console.log("instrument is "+JSONData.tick.instrument);
                        updateOpen(JSONData.tick.instrument);
                    }
                    var bid = JSONData.tick['bid'];
                    var ask = JSONData.tick['ask'];
                    //console.log(JSONData.tick);
                    /*if(JSONData.tick.instrument === 'USD_CAD')
                    {
                        console.log('match!');
                        //1.31685
                        console.log('lightSuccess: '+lightSuccess);
                        if(ask >= 1.3145 && lightSuccess === false || ask <= 1.3124 && lightSuccess === false)
                        {
                            console.log('SMS is sent');

                            console.log(result);
                            console.log("Light ON DUE TO: "+ask); //asdff
                            onLight(); //
                        }
                    }*/



                    //DON"T REMOVE THIS!!!
                    aa.tick(JSONData.tick);
                    tt.tick(JSONData.tick);
                    ap.tick(JSONData.tick);
                    /*
                    Detect if day is expired. When expired day then reset all HL


                    Reset is:

                    1. Get day's open, high and low price
                    2. Reset all and add new OHL
                    3.
                     */

                    //
                } else {
                    // console.log(JSONData);
                }
            }
        }
        end = new Date() - start;
        //console.info("Execution time: %dms", end);
        if (tickCount > 5000) {
            tickCount = 0;
            process.stdout.write('\033c');
        } else {
            tickCount++;
        }
    }).run();
};

var fireAutoTrader = function(instrument) {
   pairs = [instrument];
    instruments = pairs.join('%2C');
    options = {
        host: domain,
        path: '/v1/prices?accountId=' + account_id + '&instruments=' + instruments,
        method: 'GET',
        headers: {"Authorization": "Bearer " + access_token}
    };
    request = https.request(options, function (response) {
        response.on("data", function (chunk) {
            var _forex = chunk.toString().split('\r\n');
            //console.log(_forex);
            var p = [];
            Fiber(function () {
                p = co.pmo.find({}, {sort: {updatedAt: -1}, limit: 1}).fetch();
                if(typeof p[0] !== 'undefined' && p[0]['instrument'] !== instrument)
                {
                    console.log("Rebooting...");
                    request.abort();
                    console.log("Reason is that instruments are different.");
                    console.log(p[0]['instrument']+ ' and '+instrument);
                    lastDate = '';
                    fireAutoTrader(p[0]['instrument']);
                }else{
                    writeHistory(_forex);
                }
            }).run();



            //console.log(arrayObj.getItemsWithKey('tick', forex));
            //
            /*
             Keep small data and use rules & conditions for ticks
             Use small and full data and rules & conditions for non-ticks


             Rules & Conditions
             1. Gain and loss percent based on open and close
             2. Change speed
             3. Maximum buy profit to close trade
             4. Maximum sell profit to close trade
             5. Maximum loss percent of account (real money) to close trade
             6. Lowest price
             7. Highest price

             Calculate risk and budget
             1. Check balance
             2. Calculate spread
             3. Calculate leverage risk (1:10)

             */

            /*
             Init and listener steps
             NOTE: Need to develop matrix for multiple currencies to compare
             1. Analyze previous data (2 hours data) (ex: direction, slope speed, low, high, close, open, time, and spread)
             2. Create rules with the analyzed data
             3. Get account balance
             4. Get configuration data
             5. Make a decision with rules and analyzed data when get instrument, ask, bid and spread for selling and buying
             6. For selling, write winning or losing rates, profit and loss, trade transactions
             7. Write tick and tick presences
             8. Check health for connection, latency and heartbeat. If there is any problem then report and reconnect (if disconnect) then sell immediately if serious problems.
             9. (Shut down) Safe fail will halt all trades and close trades immediately when it meets loss percent max of account or trade for a day.
             10. Calculate profit and loss and include fee for percent and pips (not forget leverage 1:10)
             */


        });
        response.on("end", function (response) {
            console.log("Error connecting to OANDA HTTP Rates Server");
            console.log(response);
        });


    });
    request.end();
    request.setTimeout(30000, function(error){
        console.log('timeout!');
        console.log(error);
        if(typeof request !== 'undefined')
            request.abort();
        fireAutoTrader();
    });
    request.on("close", function(chunk){
        console.log("Error: Disconnected!");
        console.log(chunk);
    });
};
var  p = co.pmo.find({}, {sort:{updatedAt:-1}, limit:1});
fireAutoTrader('EUR_USD');