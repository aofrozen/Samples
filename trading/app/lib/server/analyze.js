analyze = function (pipConvertValue) {
    this.map = [];
    this.pipConvertValue = pipConvertValue;
};

analyze.prototype.run = function (days, hours) {
    console.log('Running analysis...');
    var self = this;
    var map = self.map;
    var daysCount = days.length - 1;
    var nextIndex, backIndex, indexb;
    var a = {}, b = {}, c = {}, d = {};
    console.log('Rows Count: ' + days.length);
    var rdays = days;
    //rdays.reverse();
    days.forEach(function (item, index) {
        indexb = index - 1;
        index = daysCount - index;
        map[index] = {};
        /*
         map[index]['date'] = new Date(item['d']*1000);
         map[index]['highLowPip'] = self.highLowPip(item);
         map[index]['highClosePip'] = self.highClosePip(item);
         map[index]['lowClosePip'] = self.lowClosePip(item);
         map[index]['openClosePip'] = self.openClosePip(item);

         map[index]['openLowPip'] = self.openLowPip(item);
         map[index]['openHighPip'] = self.openHighPip(item);
         map[index]['HLOrder'] = self.localHLPip(item, hours);
         */

        /*
         50 = Future
         0 = Past
         Order 0....50

         48+1 = Past
         48-1 = Future
         daysCount = 50
         */
        if (index < daysCount) {
            backIndex = index + 1;
            nextIndex = index - 1;
            /*
             Past
             */
            /*
             map[index]['lowLowPip'] = self.lowLowPip(days[index], days[backIndex]);
             map[index]['highHighPip'] = self.highHighPip(days[index], days[backIndex]);
             map[index]['middlePip'] = self.middlePip(days[index], days[backIndex]);
             */
            b = {
                'lowLowPip': self.lowLowPip(days[index], days[backIndex]),
                'highHighPip': self.highHighPip(days[index], days[backIndex]),
                'middlePip': self.middlePip(days[index], days[backIndex]),
                'LHHPip': self.lowHHPip(days[index], days[backIndex]),
                'HLLPip': self.highLLPip(days[index], days[backIndex])
            };
            /*
             Future
             */
            if (nextIndex >= 0) {
                /*
                 map[index]['fLowLowPip'] = self.lowLowPip(days[index], days[nextIndex], true);
                 map[index]['fOpenLowPip'] = self.openLowPip(days[nextIndex]);
                 map[index]['fOpenHighPip'] = self.openHighPip(days[nextIndex]);
                 map[index]['fHighHighPip'] = self.highHighPip(days[index], days[nextIndex], true);
                 map[index]['fMiddlePip'] = self.middlePip(days[index], days[nextIndex], true);
                 */
                c = {
                    'fLowLowPip': self.lowLowPip(days[index], days[nextIndex], true),
                    'fOpenLowPip': self.openLowPip(days[nextIndex]),
                    'fOpenHighPip': self.openHighPip(days[nextIndex]),
                    'fHighHighPip': self.highHighPip(days[index], days[nextIndex], true),
                    'fMiddlePip': self.middlePip(days[index], days[nextIndex], true)
                };
            }
        }
        a = {
            'date': new Date(days[index]['d'] * 1000 + (60 * 60 * 10 * 1000)),
            'highLowPip': self.highLowPip(days[index]),
            'highClosePip': self.highClosePip(days[index]),
            'lowClosePip': self.lowClosePip(days[index]),
            'openClosePip': self.openClosePip(days[index]),
            'openLowPip': self.openLowPip(days[index]),
            'openHighPip': self.openHighPip(days[index]),
            'HLOrder': self.localHLPip(days[index], hours),
            'HLCount': self.HLCount(days[index], hours),
            'openPrice': days[index]['o'],
            'HLOCZ': self.HLOCZ(days[index], hours)
        };
        d = {
            'ratio' : self.ratio(a['openHighPip'], a['openLowPip'])
        };
        _.extend(map[index], a, b, c, d);
    });
    map.reverse();
    return map;
};

analyze.prototype.numberDiff = function (a, b) {
    if (a === b)
        return 0;
    if (a > b) return a - b;
    return b - a;
};
analyze.prototype.ratio = function(high, low){
    var ratio;
        if(high > low)
        {
            if(low < 14)
            {
                low = 14;
            }
            ratio = high/low;
            if(ratio == 'Infinity')
            {
                ratio = high;
            }
        }
        if(low > high)
        {
            if(high < 14)
            {
                high = 14;
            }
            ratio = low/high;
            if(ratio == 'Infinity')
            {
                ratio = low;
            }
        }
        if(typeof ratio !== 'undefined')
        {
            return (ratio).toFixed(0);
        }else{
            return 1;
        }

};
analyze.prototype.HLCount = function (days, hours) {
    var hoursCount = hours.length - 1;
    var start = days['d'];
    var end = days['d'] + 60 * 60 * 24;
    var high = days['h'];
    var highCount = 0;
    var lowCount = 0;
    var rHighCount = 0;
    var rLowCount = 0;
    var rFirst = true;
    var chart = '';
    var rChart = '';
    var rHigh = false;
    var rLow = false;
    var low = days['l'];
    var open = days['o'];
    var lhigh = 0;
    var llow = 99999;
    var results = {};
    var HLset = false;
    var startHour = -1;
    var x, lowDiff, highDiff;
    var debugCount = 0;
    var self = this;
    var isLow = false, isHigh = false, uniquePos = 0, highPips = 0, lowPips = 0;
    for (x = hoursCount; x > 0; x--) {
        if (hours[x]['d'] >= start && hours[x]['d'] < end) {
            if (startHour === -1) {
                startHour = x;
                open = hours[x]['o'];
            }
            debugCount++;
            lowDiff = this.numberDiff(low, hours[x]['l']);
            highDiff = this.numberDiff(high, hours[x]['h']);

            if (lhigh < hours[x]['h']) {
                isHigh = true;
            }


            if (llow > hours[x]['l']) {
                isLow = true;
            }

            if(isLow === true && isHigh === true)
            {
                chart += 'X';
                if(uniquePos === 2)
                {
                    rChart += (lowPips).toFixed(2)+',';
                    lowPips = 0;
                }else if(uniquePos === 3){
                    rChart += (highPips).toFixed(2)+',';
                    highPips = 0;
                }
                uniquePos = 1;
            }else if(isLow === true && uniquePos != 2){
                chart += '-';
                if(uniquePos === 1)
                {
                    rChart += (highPips).toFixed(2)+'|'+(lowPips).toFixed(2)+',';
                    lowPips = 0;
                    highPips = 0;
                }else if(uniquePos === 3){
                    rChart += (highPips).toFixed(2)+',';
                    highPips = 0;
                }
                uniquePos = 2;

            }else if(isHigh === true && uniquePos != 3){
                chart += '+';
                if(uniquePos === 1)
                {
                    rChart += (highPips).toFixed(2)+'|'+(lowPips).toFixed(2)+',';
                    lowPips = 0;
                    highPips = 0;
                }else if(uniquePos === 2){
                    rChart += (lowPips).toFixed(2)+',';
                    lowPips = 0;
                }
                uniquePos = 3;
                highPips = 0;
            }

            if(isLow){
                if(llow === 99999)
                {
                    lowPips += (hours[x]['l']-open)*self.pipConvertValue;
                }else{
                    lowPips += (hours[x]['l']-llow)*self.pipConvertValue;
                }
                llow = hours[x]['l'];
            }
            if(isHigh){
                if(lhigh === 0)
                {
                    highPips += (hours[x]['h'] - open)*self.pipConvertValue ;
                }else{
                    highPips += (hours[x]['h'] - lhigh)*self.pipConvertValue ;
                }
                lhigh = hours[x]['h'];
            }
            //uniquePos = 0;
            isLow = false;
            isHigh = false;
            /*if (HLset === false) {
                //rChart += '*';
                chart += '*';
            } else {
                HLset = false;
            }*/

        }
    }
    if(uniquePos === 1)
    {
        rChart += highPips+'|'+lowPips+',';
    }else if(uniquePos === 2){
        rChart += lowPips+',';
    }else if(uniquePos === 3){
        rChart += highPips+',';
    }

    if (rHigh === true) {
        rChart += '+';
        rHighCount++;
        rHigh = false;
    }
    if (rLow === true) {
        rLowCount++;
        rChart += '-';
        rLow = false;
    }

/*
            if (lhigh < hours[x]['h']) {
                lhigh = hours[x]['h'];
                if (rFirst === false) {
                    highCount++;
                    chart += '+';
                    rHigh = true;
                    if (rLow === true) {
                        rLowCount++;
                        rChart += '-';
                        rLow = false;
                    }
                } else {
                    rFirst = false;
                }
                HLset = true;
            }


            if (llow > hours[x]['l']) {
                llow = hours[x]['l'];
                if (rFirst === false) {
                    lowCount++;
                    chart += '-';
                    rLow = true;
                    if (rHigh === true) {
                        rChart += '+';
                        rHighCount++;
                        rHigh = false;
                    }
                } else {
                    rFirst = false;
                }
                HLset = true;
            }


            if (HLset === false) {
                //rChart += '*';
                chart += '*';
            } else {
                HLset = false;
            }

        }
    }
    if (rHigh === true) {
        rChart += '+';
        rHighCount++;
        rHigh = false;
    }
    if (rLow === true) {
        rLowCount++;
        rChart += '-';
        rLow = false;
    }
 */

    results = {
        'lowCount': lowCount,
        'highCount': highCount,
        'rLowCount': rLowCount,
        'rHighCount': rHighCount,
        'chart': chart,
        'rChart': rChart
    };
    return results;
};

Date.prototype.stdTimezoneOffset = function() {
    /*
     var dstS = getLastSunday(d.getFullYear(), 3);
     var dstE = getLastSunday(d.getFullYear(), 10);
     dstS = new Date(Date.UTC(dstS.getFullYear(), dstS.getMonth(), dstS.getDate(),1));
     dstE = new Date(Date.UTC(dstE.getFullYear(), dstE.getMonth(), dstE.getDate(),1));
     */
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

analyze.prototype.HLOCZ = function (days, hours) {

    /* Update this for daylight 2015-2017 */
    /*

     */

    var shift = 0;
    var hoursCount = hours.length - 1;
    var dts = new Date(days['d']*1000);
    if(dts.dst())
    {
        shift = 0;
    }else{
        shift = 0;
    }
    var start = days['d'] - shift;
    var end = days['d'] + 60 * 60 * 24 - shift;
    var open = days['o'];
    //console.log(dts.dst());
    //console.log(dts);
   // console.log(new Date(start*1000));

    var self = this;
    var startHour = -1;
    var hour = 0;
    var timezone = [];
    timezone[0] = {};
    timezone[1] = {};
    var x;
    for (x = hoursCount; x > 0; x--) {
        if (hours[x]['d'] >= start && hours[x]['d'] < end) {
            if (startHour === -1) {
                startHour = x;
                open = hours[x]['o'];
            }
            hour = startHour - x;
            timezone.forEach(function (value, index) {
                if(typeof value['o'] === 'undefined')
                    value['o'] = 0;
                if (typeof value['oc'] === 'undefined') {
                    value['oc'] = 0;
                }
                if (typeof value['oh'] === 'undefined') {
                    value['oh'] = 0;
                }
                if (typeof value['ol'] === 'undefined') {
                    value['ol'] = 0;
                }
                if (typeof value['h'] === 'undefined') {
                    value['h'] = 0;
                }
                if (typeof value['l'] === 'undefined') {
                    value['l'] = 9999;
                }
                if (index == 0) //tok
                {
                    if (hour >= 0 && hour < 10) //8 hours [changed to 9 hours from 11 hours (real timezone) due to avoid overlapping with london]
                    {
                        value['loc'] = 'syd & tok';
                        if (value['o'] === 0) {
                            value['o'] = hours[x]['o'];
                        }
                        if (value['l'] > hours[x]['l']) {
                            value['l'] = hours[x]['l'];
                            value['lhr'] = hour+1;
                            value['hlOrder'] = 'HL';
                        }
                        if (value['h'] < hours[x]['h']) {
                            value['h'] = hours[x]['h'];
                            value['hhr'] = hour+1;
                            value['hlOrder'] = 'LH';
                        }
                        if(hour == 9)
                        {
                            value['c'] = hours[x]['c'];
                            value['oc'] = ((value['c'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['oh'] = ((value['h'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['ol'] = ((value['o'] - value['l'])* self.pipConvertValue).toFixed(2);
                            value['hl'] = ((value['h'] - value['l'])* self.pipConvertValue).toFixed(2);
                        }
                    }
                }
                /*
                if (index == 0) //syd
                {
                    if (hour >= 0 && hour < 8) //8 hours
                    {
                        value['loc'] = 'syd';
                        if (value['o'] === 0) {
                            value['o'] = hours[x]['o'];
                        }
                        if (value['l'] > hours[x]['l']) {
                            value['l'] = hours[x]['l'];
                            value['hlOrder'] = 'HL';
                        }
                        if (value['h'] < hours[x]['h']) {
                            value['h'] = hours[x]['h'];
                            value['hlOrder'] = 'LH';
                        }
                        if(hour == 7)
                        {
                            value['c'] = hours[x]['c'];
                            value['oc'] = ((value['c'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['oh'] = ((value['h'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['ol'] = ((value['o'] - value['l'])* self.pipConvertValue).toFixed(2);
                            value['hl'] = ((value['h'] - value['l'])* self.pipConvertValue).toFixed(2);
                        }
                    }
                }
                if (index == 1) //tok
                {
                    if (hour >= 3 && hour < 11) //8 hours
                    {
                        value['loc'] = 'tok';
                        if (value['o'] === 0) {
                            value['o'] = hours[x]['o'];
                        }
                        if (value['l'] > hours[x]['l']) {
                            value['l'] = hours[x]['l'];
                            value['hlOrder'] = 'HL';
                        }
                        if (value['h'] < hours[x]['h']) {
                            value['h'] = hours[x]['h'];
                            value['hlOrder'] = 'LH';
                        }
                        if(hour == 10)
                        {
                            value['c'] = hours[x]['c'];
                            value['oc'] = ((value['c'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['oh'] = ((value['h'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['ol'] = ((value['o'] - value['l'])* self.pipConvertValue).toFixed(2);
                            value['hl'] = ((value['h'] - value['l'])* self.pipConvertValue).toFixed(2);
                        }
                    }
                }

                if (index == 2) //lon
                {
                    if (hour >= 9 && hour < 17) {
                        value['loc'] = 'lon';
                        if (value['o'] === 0) {
                            value['o'] = hours[x]['o'];
                        }
                        if (value['l'] > hours[x]['l']) {
                            value['l'] = hours[x]['l'];
                            value['hlOrder'] = 'HL';
                        }
                        if (value['h'] < hours[x]['h']) {
                            value['h'] = hours[x]['h'];
                            value['hlOrder'] = 'LH';
                        }
                        if(hour == 16)
                        {
                            value['c'] = hours[x]['c'];
                            value['oc'] = ((value['c'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['oh'] = ((value['h'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['ol'] = ((value['o'] - value['l'])* self.pipConvertValue).toFixed(2);
                            value['hl'] = ((value['h'] - value['l'])* self.pipConvertValue).toFixed(2);
                        }
                    }
                }
                if (index == 3) //ny
                {
                    if (hour >= 15 && hour < 23) {
                        value['loc'] = 'ny';
                        if (value['o'] === 0) {
                            value['o'] = hours[x]['o'];
                        }
                        if (value['l'] > hours[x]['l']) {
                            value['l'] = hours[x]['l'];
                            value['hlOrder'] = 'HL';
                        }
                        if (value['h'] < hours[x]['h']) {
                            value['h'] = hours[x]['h'];
                            value['hlOrder'] = 'LH';
                        }
                        if(hour == 22)
                        {
                            value['c'] = hours[x]['c'];
                            value['oc'] = ((value['c'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['oh'] = ((value['h'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['ol'] = ((value['o'] - value['l'])* self.pipConvertValue).toFixed(2);
                            value['hl'] = ((value['h'] - value['l'])* self.pipConvertValue).toFixed(2);

                        }
                    }
                }*/
                if (index == 1) //ny
                {
                    if (hour >= 10 && hour < 24) {
                        value['loc'] = 'lon & ny';
                        if (value['o'] === 0) {
                            value['o'] = hours[x]['o'];
                        }
                        if (value['l'] > hours[x]['l']) {
                            value['l'] = hours[x]['l'];
                            value['lhr'] = hour-10+1;
                            value['hlOrder'] = 'HL';
                        }
                        if (value['h'] < hours[x]['h']) {
                            value['h'] = hours[x]['h'];
                            value['hhr'] = hour-10+1;
                            value['hlOrder'] = 'LH';
                        }
                        if(hour == 23)
                        {
                            value['c'] = hours[x]['c'];
                            value['oc'] = ((value['c'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['oh'] = ((value['h'] - value['o'])* self.pipConvertValue).toFixed(2);
                            value['ol'] = ((value['o'] - value['l'])* self.pipConvertValue).toFixed(2);
                            value['hl'] = ((value['h'] - value['l'])* self.pipConvertValue).toFixed(2);

                        }
                    }
                }
            });
        }
    }
    //console.log(timezone);
    return  timezone.reverse();
};

analyze.prototype.localHLPip = function (days, hours) {
    /*
     READ THIS FIRST BEFORE MODIFY!
     1. start hour is 1 hour (never 0 hour due to after close first)
     2. later hour is 1 hour (never 0 hour due to after close first and and start hour.)
     */
    var hoursCount = hours.length - 1;
    var start = days['d'];
    var end = days['d'] + 60 * 60 * 24;
    var high = days['h'];
    var favor = 'neutral';
    var low = days['l'];
    var open = days['o'];
    var highPips = ((high - open) * this.pipConvertValue);
    var lowPips = ((open - low) * this.pipConvertValue);
    var lowDiffH = 99999;
    var highDiffH = 99999;
    var lhigh = 0;
    var llow = 99999;
    var results = {};
    var startHour = -1;
    var x, lowDiff, highDiff, flhigh, foundLow, lowPosition, fllow, foundHigh, highPosition;
    var debugCount = 0;
    for (x = hoursCount; x > 0; x--) {
        if (hours[x]['d'] >= start && hours[x]['d'] < end) {
            if (startHour === -1) {
                startHour = x;
                open = hours[x]['o'];
            }
            debugCount++;
            lowDiff = this.numberDiff(low, hours[x]['l']);
            highDiff = this.numberDiff(high, hours[x]['h']);
            if (lhigh < hours[x]['h']) {
                lhigh = hours[x]['h'];
            }
            if (llow > hours[x]['l']) {
                llow = hours[x]['l'];
            }
            if (lowDiff <= lowDiffH) {
                flhigh = Math.round((lhigh - open) * this.pipConvertValue);
                if (flhigh < 0) {

                }
                lowDiffH = lowDiff;
                foundLow = hours[x]['l'];
                lowPosition = x;
            }


            if (highDiff <= highDiffH) {
                fllow = Math.round((open - llow) * this.pipConvertValue);
                if (fllow < 0) {

                }
                highDiffH = highDiff;
                foundHigh = hours[x]['h'];
                highPosition = x;
            }

        }
    }
    if (foundHigh && foundLow) {

        if (highPosition < lowPosition) {
            if (highPips > lowPips) {
                favor = '<span style="color:red">Loss</span>';
            } else {
                favor = '<span style="color:green">Win</span>';
            }
            results = {
                'HLOrder': 'Low',
                'localPips': flhigh,
                'hours': (lowPosition - highPosition),
                'sHours': (startHour - lowPosition) + 1,
                'favor': favor
            };
        } else {
            if (highPips < lowPips) {
                favor = '<span style="color:red">Loss</span>';
            } else {
                favor = '<span style="color:green">Win</span>';
            }
            results = {
                'HLOrder': 'High',
                'localPips': fllow,
                'hours': (highPosition - lowPosition),
                'sHours': (startHour - highPosition) + 1,
                'favor': favor
            };
        }
    }
    return results;
};

analyze.prototype.openLowPip = function (data) {
    if (typeof data !== 'undefined') {
        var low = data['l'];
        var open = data['o'];
        return this.pip(open - low);
    }
    return null;
};

analyze.prototype.openHighPip = function (data) {
    var high = data['h'];
    var open = data['o'];
    return this.pip(high - open);
};

analyze.prototype.highLowPip = function (data) {
    var high = data['h'];
    var low = data['l'];
    return this.pip(high - low);
};

analyze.prototype.highClosePip = function (data) {
    var high = data['h'];
    var close = data['c'];
    return this.pip(high - close);
};

analyze.prototype.openClosePip = function (data) {
    var open = data['o'];
    var close = data['c'];
    return this.pip(close - open);
};

analyze.prototype.lowClosePer = function () {
    var low = data['l'];
    var close = data['c'];
    var high = data['h'];
    return ((1 - (close - low) / (high - low)) * 100).toFixed(2);
};

analyze.prototype.lowClosePip = function (data) {
    var low = data['l'];
    var close = data['c'];
    return this.pip(close - low);
};

/** Comparsion **/
analyze.prototype.lowHHPip = function (data, nData){ //near 0 = likely up
    var low = data['l'];
    var nhigh = nData['h'];
    return this.pip(low - nhigh);
};
analyze.prototype.highLLPip = function (data, nData){ //near 0 = likely down
    var high = data['h'];
    var nlow = nData['l'];
    return this.pip(high - nlow);
};
analyze.prototype.lowLowPip = function (data, nData, future) {
    var low = data['l'];
    var nLow = nData['l'];
    var date = data['d'];
    var nDate = nData['d'];
    if (future === true) {
        return this.pip(nLow - low);
    } else {
        return this.pip(low - nLow);
    }
};

analyze.prototype.highHighPip = function (data, nData, future) {
    var high = data['h'];
    var nHigh = nData['h'];
    if (future === true) {
        return this.pip(nHigh - high);
    } else {
        return this.pip(high - nHigh);
    }
};

analyze.prototype.middlePip = function (data, nData, future) {
    var high = data['h'];
    var low = data['l'];
    var nHigh = nData['h'];
    var nLow = nData['l'];
    var mid = (high + low) / 2;
    var nMid = (nHigh + nLow) / 2;
    if (future === true) {
        return this.pip(nMid - mid);
    } else {
        return this.pip(mid - nMid);
    }
};

analyze.prototype.pip = function (value) {
    return Math.round(value * this.pipConvertValue);
};