probability = function () {
    this.results = [];
    var self = this;
    self.spread = 0;
};

probability.prototype.run = function (days, hours, spread) {
    console.log('Running probability...');
    var self = this;
    var lowLowSize = 1000;
    var openLowSize = 1000;
    var highHighSize = -1000;
    var openHighSize = 1000;
    var map = [];
    var tp = 65;
    var sl = 23;
    self.spread = parseFloat(spread);
    //this.openHighPipProbability(days);
    //this.buyLowLowProbability(days, lowLowSize);
    //this.buyHighHighProbability(days, lowLowSize);

    map['HLHours'] = this.HLHoursProbability(days);
    map['HLHoursDifference'] = this.HLHoursDifferenceProbability(days);
    map['ratio'] = this.ratioProbability(days);
    map['topBuy'] = this.topBuy(days);
    map['localPips'] = this.localPipsProbability(days);
    map['stoploss'] = this.stopLossProbability(days, lowLowSize, openLowSize);
    map['takeProfit'] = this.takeProfitProbability(days, lowLowSize, openLowSize);

    map['highLow'] = this.highLowProbability(days);
    map['buyOC'] = this.buyOCProbability(days, tp, sl);
    map['sellOC'] = this.sellOCProbability(days, tp, sl);

    map['STTakeProfit'] = this.zTakeProfit(days, 'syd & tok');
    map['STStoploss'] = this.zStoploss(days, 'syd & tok');

    map['LNTakeProfit'] = this.zTakeProfit(days, 'lon & ny');
    map['LNStoploss'] = this.zStoploss(days, 'lon & ny');

    /* Tests */
    map['LNDirection'] = this.zDirection(days, 'lon & ny');
    map['STDirection'] = this.zDirection(days, 'syd & tok');
    console.log('lon & ny');
    map['LNHours'] = this.zHours(days, 'lon & ny');
    console.log('syd & tok');
    map['LNHL'] = this.zHL(days, 'lon & ny');
    map['STHL'] = this.zHL(days, 'syd & tok');
    map['STHours'] = this.zHours(days, 'syd & tok');
    //map['STHoursB'] = this.zHoursB(days, 'lon & ny');
    map['pRatio'] = this.ratio(days);
    map['pipsHours'] = this.pipHours(days);
    map['pipDuration'] = this.pipDuration(hours, 0.005);

    //console.log(map['pipDuration']);
    /*
    Direction Probability
    Combo probability -> direction probability
    1. Combo = Up and down probability
        up or down, up-down or down-up, + or - to up or down
     */
    /*
     New Probability
     Buy - Open-Close Pip Probability
     Sell - Open-Close Pip Probability
     */
    // console.log(map);
    return map;
};
function filterProbability(arr, percent) {
    var n = [];
    var c = arr.length;
    arr.forEach(function (item, index) {
        if (item > percent) {
            n[index] = item;
        }
    });
    return n;
}

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

probability.prototype.pipDuration = function(hours, targetPips)
{
    var high, low;
    var c = 0;
    var l = [], h = [];
    var s = 0;
    var f = 0;
    var pipConvert = 0.0001;
    var hourPeriod = 24;
    var minPips = 150;
    var maxPips = 151;
    var minHours = 72;
    var maxHours = 73;
    var data = [];
    for(var x=minPips;x<maxPips;x++)
    {
        //console.log('Hour: '+x);
        for(var y=minHours;y<maxHours;y++)
        {
            s = 0;
            f = 0;
            c = 0;
            h = [];
            l = [];
            hours.forEach(function(hour, index)
                {
                    /* Every hour calculation or Every time calculation */
                    /*
                     h = high
                     l = low
                     */
                    high = hour['h'];
                    low = hour['l'];
                    if(c > y)
                    {
                        h.unshift(high);
                        l.unshift(low);
                        h.pop();
                        l.pop();
                        if(x*pipConvert <= (h.max() - l.min()))
                        {
                            s++;
                            // console.log('found '+targetPips);
                        }else{
                            f++;
                        }
                    }else{
                        c++;
                        h.unshift(high);
                        l.unshift(low);
                    }

                }
            );

            //console.log("Pip: "+x);
           // console.log("Hour: "+y);
           // console.log("Success: "+s);
           // console.log("Failure: "+f);
           // console.log(((s/(f+s))*100).toFixed(2));
            if(typeof data[x] === 'undefined')
                data[x] = [];
            data[x].push({'pip' : x, 'hour' : y, 'prob' : ((s/(f+s))*100).toFixed(2), 'failure' : f, 'success' : s});

        }
    }
    return data;

};
probability.prototype.pipHours = function(days){
    //HLOCZ
    console.log("PIP HOURS");
    var items = [];
    var itemsA = [];
    var hours = [];
    days.forEach(function (day, index) {
        day['HLOCZ'].forEach(function (item) {
            if (item['loc'] == 'lon & ny') //jap then else hlorder. if new york then get future jap
            {
                /*
                 First hours

                 last hours

                 hhr = high hour
                 lhr = low hour
                 hour number
                 */
                //oh and ol
                /*
                    if(typeof hours[item['hhr']] === 'undefined')
                    {
                        hours[item['hhr']] = parseFloat(item['oh']);
                    }else{
                        hours[item['hhr']] += parseFloat(item['oh']);
                    }
*/
                    if(typeof hours[item['lhr']] === 'undefined')
                    {
                        hours[item['lhr']] = parseFloat(item['ol']);
                    }else{
                        hours[item['lhr']] += parseFloat(item['ol']);
                    }

                    //items.push(item['hhr']); //first
                    //itemsA.push(item['lhr']); //last
            }
        });
    });
    hours.forEach(function(day, index){
       console.log(day+ ' = '+index);
    });
    //var first = this.difference(this.lists(items, 'no', true));
   // var last = this.difference(this.lists(itemsA, 'no', true));

    //console.log({'first' : first, 'last' : last});
   // return {'first' : first, 'last' : last};
};
probability.prototype.ratio = function(days){
    var items = [];
    var itemsA = [];
    var c = 0;
    days.forEach(function (day, index) {
       if(day['ratio'])
       {
           items.push(day['ratio']);
       }
    });
    days.forEach(function (day, index) {
        if(day['ratio'] >= 10 && (day['openHighPip'] <= 14 || day['openLowPip'] <= 14))
        {
            c++;
        }
    });
    //console.log(c + ' of '+days.length);
    //console.log(((c/days.length)*100).toFixed(2));
    return this.lists(items, 'no');
};

probability.prototype.zHL = function(days, loc){
    var items = [];
    days.forEach(function (day, index) {
        day['HLOCZ'].forEach(function (item) {
            if (item['loc'] === loc) //jap then else hlorder. if new york then get future jap
            {
                if(typeof item['hl'] !== 'undefined')
                    items.push(parseInt(item['hl']));
            }
        });
    });
    //console.log('HL');
    //console.log(this.lists(items, 'no'));
    return this.lists(items, 'no');
};
probability.prototype.zHoursB = function(days, loc){
    //console.log('zHoursB');
    var items = [];
    var itemsA = [];
    if(loc === 'syd & tok')
    {
        hours = 10;
    }else{
        hours = 14;
    }
    for(var x = 0; x <= hours; x++)
    {
    days.forEach(function (day, index) {
            day['HLOCZ'].forEach(function (item) {
                if (item['loc'] === loc ) //jap then else hlorder. if new york then get future jap
                {
                    /*
                     First hours

                     last hours

                     First hour -> last hours chart
                     */
                    //console.log(x);
                    if(item['hlOrder'] === 'HL' && x === item['hhr'])
                    {

                        items.push(item['lhr']-item['hhr']); //last
                    }else if(item['hlOrder'] === 'LH' && x === item['lhr']){
                        items.push(item['hhr']-item['lhr']); //last
                    }
                }
            });
    });
        //console.log("Building lists/difference for "+x+" Hours");
        itemsA.push(this.difference(this.lists(items, 'no', true)));
        items = [];
    }

    //console.log(itemsA);
    //return {'first' : first, 'last' : last};
};

probability.prototype.zHours = function(days, loc){
    var items = [];
    var itemsA = [];
    days.forEach(function (day, index) {
        day['HLOCZ'].forEach(function (item) {
            if (item['loc'] === loc ) //jap then else hlorder. if new york then get future jap
            {
                /*
                First hours

                last hours
                 */
                if(item['hlOrder'] === 'HL')
                {
                    items.push(item['hhr']); //first
                    itemsA.push(item['lhr']); //last
                }else{
                    items.push(item['lhr']); //first
                    itemsA.push(item['hhr']); //last
                }
            }
        });
    });
    var first = this.difference(this.lists(items, 'no', true));
    var last = this.difference(this.lists(itemsA, 'no', true));

    //console.log({'first' : first, 'last' : last});
    return {'first' : first, 'last' : last};
};

probability.prototype.difference = function(results)
{
    var lastItem = '';
    var lists = [];
    results.forEach(function(item, index){
        if(lastItem === '')
        {
            lastItem = item;
        }else{
            lists.push((item-lastItem).toFixed(2));
            lastItem = item;
        }
    });
    return lists;
};

probability.prototype.zDirection = function(days, loc){
    var items = [];
    var itemsA = [];
    var combo = '';
    var saveHLOrder = '';
    days.forEach(function (day, index) {
        //console.log(index);
        //break;
        day['HLOCZ'].forEach(function (item) {

                if (item['loc'] === loc ) //jap then else hlorder. if new york then get future jap
                {
                    /*
                     Collect combo for probability
                     */
                    if (item['oc'] > 0) {
                        combo = item['hlOrder'];
                    } else {
                        combo = item['hlOrder'];
                    }
                    items.push(combo);
                    if (saveHLOrder != '') {
                        itemsA.push(saveHLOrder);
                        saveHLOrder = '';
                    }
                } else if (typeof item['loc'] !== 'undefined') {
                    //Future (Next)
                    /*


                     Syd & Tok -> Lon & NY

                     */
                    if (item['loc'] !== 'syd && tok') {
                        itemsA.push(item['hlOrder']);
                    } else {
                        if (typeof days[index + 1] !== 'undefined') {
                            itemsA.push(days[index + 1]['HLOCZ']['hlOrder']);
                        }
                    }

                }
        });
    });
    /* Custom probability */
    var lists = [];
    var listsA = [];
    var countA = 0;
    //console.log(itemsA);
    Object.keys(items).forEach(function(key) {
        var value = items[key];
        if(typeof listsA[value] === 'undefined')
        {
            listsA[value] = [];
            listsA[value]['probability'] = 0;
            listsA[value]['sell'] = 0;
            listsA[value]['buy'] = 0;
        }else{
            listsA[value]['probability']++;
            if(itemsA[countA] !== 'undefined')
            {
                if(itemsA[countA] == 'HL')
                {
                    listsA[value]['sell']++;
                }else if(itemsA[countA] =='LH'){
                    listsA[value]['buy']++;
                }
            }
        }

        /*
        Structure
        list[0]['combo'] = probability %
        list[0]['sell'] = probability %
        list[0]['buy'] = probability %
         */
        countA++;

    });
    //console.log(listsA);

    var finalLists = [];
    Object.keys(lists).forEach(function(key) {
        var value = lists[key]['probability'];
        finalLists.push({'combo' : value, 'sell' : listsA[key]['sell'], 'buy' : listsA[key]['buy']});
    });
    //console.log(finalLists);
    return finalLists;
};

probability.prototype.zWaitTakeProfit = function(days, loc, type){
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        //console.log(item);
        //break;
        item['HLOCZ'].forEach(function (item) {
            if ('sell' === type) {
                if (item['loc'] == loc && item['hlOrder'] === 'HL') {
                    count++;
                    items.push(item['oc']);
                }
            } else {
                if (item['loc'] == loc && item['hlOrder'] === 'LH') {
                    count++;
                    items.push(item['oc']);
                }
            }
        });
    });
    return this.lists(items, 'no');
};

probability.prototype.zTakeProfit = function(days, loc, type){
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        //console.log(item);
        item['HLOCZ'].forEach(function (item) {
                if (item['loc'] == loc && item['hlOrder'] === 'HL') {
                    count++;
                    items.push(item['ol']);
                }
                if (item['loc'] == loc && item['hlOrder'] === 'LH') {
                    count++;
                    items.push(item['oh']);
                }
        });
    });
    return this.lists(items, 'no');
};

probability.prototype.zHLProfit = function(days, loc, type){
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        item['HLOCZ'].forEach(function (item) {
            if ('sell' === type) {
                if (item['loc'] == loc && item['hlOrder'] === 'HL') {
                    count++;
                    items.push(item['hl']);
                }
            } else {
                if (item['loc'] == loc && item['hlOrder'] === 'LH') {
                    count++;
                    items.push(item['hl']);
                }
            }
        });
    });
    return this.lists(items, 'no');
};

probability.prototype.zStoploss = function(days, loc, type){
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        item['HLOCZ'].forEach(function (item) {
                if (item['loc'] == loc && item['hlOrder'] === 'HL') {
                    count++;
                    items.push(item['oh']);
                }

                if (item['loc'] == loc && item['hlOrder'] === 'LH') {
                    count++;
                    items.push(item['ol']);
                }
        });
    });
    return this.lists(items, 'no');
};

probability.prototype.buyOCProbability = function (days) {
    /*
     Open - Close = pips
     High - Open = pips TP
     Open - Low = pips SL
     */
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        if (item['fLowLowPip'] > 0 && item['fHighHighPip'] > 0) {
            count++;
            items.push(item['openClosePip']-self.spread);
        }
    });
    return this.PNlists(items, 'no');

};

probability.prototype.sellOCProbability = function (days) {
    /*
     Open - Close = pips
     High - Open = pips SL
     Open - Low = pips TP
     */
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        if (item['fLowLowPip'] < 0 && item['fHighHighPip'] < 0) {
            count++;
            items.push(item['openClosePip']-self.spread );
        }
    });
    return this.PNlists(items, 'no');
};
probability.prototype.uLists = function (days) {
    var items = [];
    var probability = [];
    var x, min, max;
    items = days;
    min = 0; //Math.min.apply(null, days);
    max = Math.max.apply(null, items);
    //console.log("Min: "+min);
    //console.log("Max: "+max);
    var daysCount = items.length;
        for (x = min; x <= max; x++) {
            probability[x] = 0;
            items.forEach(function (item, index) {
                    if (x == item) {
                        if (probability[x] != null) {
                            probability[x]++;
                        } else {
                            probability[x] = 1;
                        }
                    }

            });
            probability[x] = ((probability[x] / daysCount) * 100).toFixed(1);
        }
    /*
     krsort(probability)
     */
    // probability = filterProbability(probability, 1);
    return probability;
};
probability.prototype.lists = function (days, name, reverse, customName, peak, print) {
    var items = [];
    var probability = [];
    var x, min, max;
    if (name === 'no') {
        items = days;
    } else {
        days.forEach(function (item, index) {
            items.push(item[name]);
        });
    }
    min = 0; //Math.min.apply(null, days);
    max = Math.max.apply(null, items);
    //console.log("Min: "+min);
    //console.log("Max: "+max);
    var daysCount = items.length;
    if (peak !== true) {
        for (x = min; x <= max; x++) {
            probability[x] = 0;
            items.forEach(function (item, index) {
                if (reverse !== true) {
                    if (x <= item) {
                        if (probability[x] != null) {
                            probability[x]++;
                        } else {
                            probability[x] = 1;
                        }
                    }
                } else {
                    if (x >= item) {
                        if (probability[x] != null) {
                            probability[x]++;
                        } else {
                            probability[x] = 1;
                        }
                    }
                }
            });
            probability[x] = ((probability[x] / daysCount) * 100).toFixed(1);
        }
    } else {
        for (x = min; x <= max; x++) {
            probability[x] = 0;
            items.forEach(function (item, index) {
                if (reverse !== true) {
                    if (x === item) {
                        if (probability[x] != null) {
                            probability[x]++;
                        } else {
                            probability[x] = 1;
                        }
                    } else {
                        if (x === item) {
                            if (probability[x] != null) {
                                probability[x]++;
                            } else {
                                probability[x] = 1;
                            }
                        }
                    }
                }
            });
            probability[x] = ((probability[x] / daysCount) * 100).toFixed(1);
        }
    }
    /*
     krsort(probability)
     */
    //probability = filterProbability(probability, 5);
    return probability;
};

probability.prototype.PNlists = function (days) { //Positive and Negative Probability
    var items = [];
    var probability = [];
    items = days;
    var daysCount = items.length;
    probability[0] = 0;
    probability[1] = 0;
    items.forEach(function (item, index) {
        if(item > 0)
        {
            probability[1]++;
        }else{
            probability[0]++;
        }
    });
    probability[1] = ((probability[1] / daysCount) * 100).toFixed(0); //Positive
    probability[0] = ((probability[0] / daysCount) * 100).toFixed(0); //Negative
    /*
     krsort(probability)
     */
    return probability;
};

probability.prototype.topBuy = function (days) {
    var items = [];
    var count = 0;
    days.forEach(function (item) {
        if (item['HLOrder']['HLOrder'] === 'High') {
            count++;
            items.push(item['HLOrder']['localPips']);
        }
    });
    //var SSL = this.lists(items, 'no', false, false, false, false);
    items = [];
};

probability.prototype.ratioProbability = function (days) {
    var items = [];
    var count = 0;
    days.forEach(function (item) {
        count++;
        if (item['openHighPip'] >= item['openLowPip']) {
            items.push(Math.floor(item['openHighPip'] / ((item['openLowPip'] > 0) ? item['openLowPip'] : 1)));
        } else {
            items.push(Math.floor(item['highLowPip'] / ((item['openHighPip'] > 0) ? item['openHighPip'] : 1)));
        }
    });
    //return items;
    return this.lists(items, 'no', false, ' R');
};

probability.prototype.openHighPipProbability = function (days) {
    var items = [];
    var count = 0;
    days.forEach(function (item) {
        count++;
    });
    //return items;
    return this.lists(items, 'no', false, false, true);
};

probability.prototype.HLHoursProbability = function (days) {
    var items = [];
    var count = 0;
    days.forEach(function (item) {
        if (item['HLOrder']['sHours'] >= 0 && item['HLOrder']['sHours'] != null) {
            count++;
            items.push(item['HLOrder']['sHours'])

        }

    });
    return this.lists(items, 'no', true, 'Hour(s)', false);
    //return items;
    /*
     $this->lists($items, 'no', true, 'Hour(s)', true);
     $this->lists($items, 'no', true, 'Hour(s)', false);
     */
};

probability.prototype.HLHoursDifferenceProbability = function (days) {
    var items = [];
    var count = 0;
    days.forEach(function (item) {
        if (item['HLOrder']['sHours'] >= 0 && item['HLOrder']['sHours'] != null) {
            count++;
            items.push(item['HLOrder']['hours']);
        }
    });
    if (items.length > 0) {
        return this.lists(items, 'no', true, 'Hour(s)', false);
    }
    return [];

};

probability.prototype.highLowProbability = function (days) {
    return this.lists(days, 'highLowPip');
};

probability.prototype.localPipsProbability = function (days) {
    var items = [];
    var self = this;
    days.forEach(function (item) {
        if(typeof item['HLOrder']['localPips'] !== 'undefined')
            {
                items.push(item['HLOrder']['localPips']+self.spread);
            }

    });
    return this.lists(items, 'no');
    //return items;
};

probability.prototype.takeProfitProbability = function (days, lowLowPips, lowOpenPips) {
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        /*if (item['fLowLowPip'] > 0 && item['fHighHighPip'] > 0 && item['fLowLowPip'] <= lowLowPips && item['fOpenLowPip'] <= lowOpenPips) {
         count++;
         items.push(item['fOpenHighPip']-self.spread );
         }
         */
        //if(item['openLowPip'] > item['openHighPip'])
        if(item['openClosePip'] < 0)
        {
            count++;
            items.push(item['openLowPip']+self.spread);
        }else{
            items.push(item['openHighPip']+self.spread);
        }
    });
    return this.lists(items, 'no');
    //return items;
};

probability.prototype.stopLossProbability = function (days, lowLowPips, lowOpenPips) {
    var items = [];
    var count = 0;
    var self = this;
    days.forEach(function (item) {
        /*
         if (item['fLowLowPip'] > 0 && item['fHighHighPip'] > 0 && item['fLowLowPip'] <= lowLowPips && item['fOpenLowPip'] <= lowOpenPips) {
         count++;
         items.push(item['fOpenLowPip']+self.spread);
         }
         */
        if(item['openClosePip'] < 0) //item['openLowPip'] > item['openHighPip']
        {
            count++;
            items.push(item['openHighPip']+self.spread);
        }else{
            items.push(item['openLowPip']+self.spread);
        }
    });
    return this.lists(items, 'no');
    //return items;
};

probability.prototype.buyHighHighProbability = function (days, lowOpenPips) {
    var items = [];
    var count = 0;
    days.forEach(function (item) {
        if (item['fLowLowPip'] > 0 && item['fHighHighPip'] > 0 && item['fLowLowPip'] <= lowOpenPips) {
            count++;
            items.push(item['fHighHighPip']);
        }
    });
    return this.lists(items, 'no');
    //return items;
};

probability.prototype.buyLowLowProbability = function (days, lowOpenPips) {
    var items = [];
    var count = 0;
    var sum = 0;
    days.forEach(function (item) {
        if (item['fLowLowPip'] > 0 && item['fHighHighPip'] > 0 && item['fLowLowPip'] <= lowOpenPips) {
            count++;
            items.push(item['fLowLowPip']);
            sum += item['lowLowPip'];
        }
    });
    return items;
};
