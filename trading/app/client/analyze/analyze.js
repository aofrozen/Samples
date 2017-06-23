function generateCountArray(arr, nozero)
{
    var c = arr.length;
    var a = [];
    var x = 0;
    if(nozero === true){
        for(x=1;x<=c;x++)
        {
            a.push(x);
        }
        return a;
    }else{
        for(x=0;x<c;x++)
        {
            a.push(x);
        }
        return a;
    }


}

function arrayExists(array, value)
{
    if(typeof array === 'undefined' || typeof array[value] === 'undefined' || array.length === 0)
        return false;
    return true
}

percentColors = [
    { pct: 0.0, color: { r: 253, g: 224, b: 224 } },
    { pct: 0.8, color: { r: 251, g: 255, b: 210 } },
    { pct: 0.85, color: { r: 210, g: 255, b: 214 } } ];
percentColorsB = [
    { pct: 0.0, color: { r: 253, g: 224, b: 224 } },
    { pct: 0.5, color: { r: 251, g: 255, b: 210 } },
    { pct: 1, color: { r: 210, g: 255, b: 214 } } ];

getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColorsB.length - 1; i++) {
        if (pct < percentColorsB[i].pct) {
            break;
        }
    }
    var lower = percentColorsB[i - 1];
    var upper = percentColorsB[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
};
weight = function(ts, r){
    if(r < parseFloat($('.ratio').val()) || ts < 0.05)
    {
        return 0;
    }else{
        return ts*r;
    }
};

Template.analyze.helpers({
    'HLOrderFilter' : function(direction, hlOrder){
        if(direction === 'high')
        {
            if(hlOrder === 'HL')
            {
                return ' First';
            }else{
                return ' Last';
            }
        }
        if(direction === 'low')
        {
            if(hlOrder === 'HL')
            {
                return ' Last';
            }else{
                return ' First';
            }
        }
    },
    'dataExists' : function(){
        return Template.instance().analyzedData.get().length > 0;
    },
    'setLoading': function (index) {
        //console.log(index);
        if ((index + 1) >= 210) //Template.instance().analyzedData.get().length
        {
            console.log("COMPLETE!");
            Template.instance().loading.set(false);
        }
    },
    'isLoading': function () {
        return Template.instance().loading.get();
    },
    'multiplicationLine': function (a, name, isZone, noZero) {
        if(typeof isZone === 'undefined')
            isZone = false;
        if(typeof noZero === 'undefined')
            noZero = false;
        var html = '';
        html += '<table class="table table-bordered"><tbody><tr>';
        if (typeof a === 'undefined')
            return '';
        var aa = a.length;
        var row = 10;
        var p;
        var zone = '';
        for (var r = 0; r < aa; r++) {
            if (r % row == 0) {
                html += '</tr><tr>';
            }
            if (a[r] * 0.01 == null) {
                p = 0;
            } else {
                p = a[r] * 0.01;
            }
            if(isZone === true)
            {
                if(r <= 3)
                {
                    zone = 'Syd';
                }
                if(r > 3 && r <= 9)
                {
                    zone = 'Syd-Tok';
                }
                if(r > 9 && r <= 12)
                {
                    zone = 'Tok-Lon';
                }
                if(r > 12 && r <= 15)
                {
                    zone = 'Lon';
                }
                if(r > 15 && r <= 19)
                {
                    zone = 'Lon-NY';
                }
                if(r > 19 && r <= 24)
                {
                    zone = 'NY';
                }
            }
            if(noZero === true)
            {
                if(0 != (p * 100).toFixed(2))
                {
                    html += '<td style="width:100px;background-color:' + getColorForPercentage(p) + ';color:black;" class="text-center">' + r + ' ' + name + ' / ' + (p * 100).toFixed(2) + '%  '+zone+'</td>';
                }
            }else{
                html += '<td style="width:100px;background-color:' + getColorForPercentage(p) + ';color:black;" class="text-center">' + r + ' ' + name + ' / ' + (p * 100).toFixed(2) + '%  '+zone+'</td>';
            }

        }
        html += '</tr>';
        html += '</tbody></table>';
        return html;
    },
    'STHL' : function(){
        return Template.instance().probabilityData.get()['STHL'];
    },
    'LNHL' : function(){
        return Template.instance().probabilityData.get()['LNHL'];
    },
    'pRatio': function () {
        return Template.instance().probabilityData.get()['pRatio'];
    },
    'highLow': function () {
        return Template.instance().probabilityData.get()['highLow'];
    },
    'HLHours': function () {
        return Template.instance().probabilityData.get()['HLHours'];
    },
    'TP': function () {
        return Template.instance().probabilityData.get()['takeProfit'];
    },
    'SL': function () {
        return Template.instance().probabilityData.get()['stoploss'];
    },
    'SLL': function () {
        return Template.instance().probabilityData.get()['localPips'];
    },
    'STTakeProfit' : function(){
        return Template.instance().probabilityData.get()['STTakeProfit'];
    },
    'STStoploss' : function(){
        return Template.instance().probabilityData.get()['STStoploss'];
    },
    'LNTakeProfit' : function(){
        return Template.instance().probabilityData.get()['LNTakeProfit'];
    },
    'LNStoploss' : function(){
        return Template.instance().probabilityData.get()['LNStoploss'];
    },
    'analyzedData': function () {
        var a = Template.instance().analyzedData.get();
        var aa = [];
        for (var x = 0; x < 210; x++) {
            if (a[x])
                aa.push(a[x]);
        }
        return aa;
    },
    'LNFHours' : function(){
        return Template.instance().probabilityData.get()['LNHours']['first'];
    },
    'LNLHours' : function(){
        return Template.instance().probabilityData.get()['LNHours']['last'];
    },
    'STFHours' : function(){
        return Template.instance().probabilityData.get()['STHours']['first'];
    },
    'STLHours' : function(){
        return Template.instance().probabilityData.get()['STHours']['last'];
    },


    'probabilityData': function () {
        return Template.instance().probabilityData.get();
    },
    'isLow' : function(value){
      if(value < 0)
      {
          return true;
      }else{
          return false;
      }
    },
    'formatPips': function (pip, cPip, maxPip, color) {
        pip = parseFloat(pip);
        if (maxPip !== false) {
            maxPip = parseFloat(maxPip);
            if (cPip !== false) {
                cPip = parseFloat(cPip);
                if (pip > cPip) {
                    return "<span style='color:" + color + ";font-weight:bold;'>" + pip + " pip (" + ((pip / maxPip) * 100).toFixed(2) + "%)</span>";
                } else {
                    return "<span>" + pip + " pip</span>"; //(" + ((pip / maxPip) * 100).toFixed(2) + "%)
                }
            } else {
                if (pip > 0) {
                    return "<span style='color:green;font-weight:bold'>" + pip + " pip (" + ((pip / maxPip) * 100).toFixed(2) + "%)</span>";
                } else {
                    return "<span style='color:red;font-weight:bold'>" + pip + " pip</span>"; //(" + ((pip / maxPip) * 100).toFixed(2) + "%)
                }
            }
        } else {
            if (cPip !== false) {
                cPip = parseFloat(cPip);
                if (pip > cPip) {
                    return "<span style='color:" + color + ";font-weight:bold'>" + pip + " pip</span>";
                } else {
                    return "<span>" + pip + " pip</span>";
                }
            } else {
                if (pip > 0) {
                    return "<span style='color:green;font-weight:bold'>" + pip + " pip</span>";
                } else {
                    return "<span style='color:red;font-weight:bold'>" + pip + " pip</span>";
                }
            }

        }
    },
    'multiplicationTable': function (a, b) { //profit, stoploss
        //return '<h2 class="text-center"><span class="label label-danger">This feature has been disabled.</span></h2>';
        var html = '';
        html += '<table class="table table-bordered"><tbody>';
        var aa = a.length;
        var bb = b.length;
        if (aa > 150)
            aa = 150;
        if (bb > 150)
            bb = 150;
        for (var r = 0; r < aa; r++) {
            html += '<tr>';
            for (var c = 0; c < bb; c++) {
                if (true) {
                    html += '<td style="width:100px;font-size:11px;color:black;background-color:' + getColorForPercentage(weight(((a[r] * 0.01) * (1 - b[c] * 0.01)).toFixed(2), (r / c))) + '" class="text-center">' + ((a[r] * 0.01) * (1 - b[c] * 0.01) * 100).toFixed(0) + '%<br>' + r + 'P<br>' + c + 'S<br>' + ((r / c).toFixed(2)) + 'R<br>' + (((a[r] * 0.01) * (1 - b[c] * 0.01)).toFixed(2) * (r / c)).toFixed(2) + '</td>';
                    //html += '<td style="width:100px;font-size:11px;color:white;background-color:'+getColorForPercentage(weight(((a[r]*0.01)*(1-b[c]*0.01)).toFixed(2),(r/c)))+'" class="text-center">'+((a[r]*0.01)*(1-b[c]*0.01)*100).toFixed(0)+'% <br>'+r+'P '+(a[r])+'%<br>'+c+'S '+b[c]+'%<br>'+((r/c).toFixed(2))+'R<br>'+(((a[r]*0.01)*(1-b[c]*0.01)).toFixed(2)*(r/c)).toFixed(2)+'</td>';
                } else {
                    html += '<td style="width:100px;font-size:11px;color:black;background-color:red;color:white;font-weight:bold;">BAD</td>';
                }

            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    },
    'timeProbabilityTable' : function(a){
        var html = '';
        var pip = -1;
        var hoursCount = 0;
        console.log(a);
        html += '<table class="table table-bordered"><tbody>';

       a.forEach(function(v, index){
           html += '<tr>';
           console.log(typeof v);
           if(v instanceof Array)
           {
               v.forEach(function(z, index){
                   html += '<td style="width:100px;font-size:11px;color:black;background-color:' + getColorForPercentage((z['prob']*0.01).toFixed(2)) + '" class="text-center">'+z['hour']+' Hours<br>'+z['pip']+' Pips<br>'+z['prob']+'% Prob </td>';
               });
           }

       });

        html += '</tr></tbody></table>';
        return html;
    }
});

var getChartData = function(field, records, list)
{
    if(typeof list === 'undefined')
        list = [];
    list.splice(0, list.length);
    console.log(records);
    var v = 0;
    for(var x in records)
    {

            list.push({x: v, y: parseInt(records[parseInt(x)])});
        v++;
    }
    list.reverse();
    return list;
};

Template.analyze.events({
    'click .analyze-btn': function (event, template) {
        template.loading.set(true);
        Meteor.call('analyze', $('.cPair').val(), $('.spread').val(), function (error, r) {
            console.log('Got all data');
            //Template.instance().probabilityData.set(r['probabilityData']);
            if (r['analyzedData']) {
                console.log(r);
                template.analyzedData.set(r['analyzedData'].reverse());
                template.probabilityData.set(r['probabilityData']);
                console.log('All are set');
                console.log('now creating charts');
                new Chartist.Line('.hlhours-chart', {
                    labels: generateCountArray(r['probabilityData']['HLHours']),
                    series: [r['probabilityData']['HLHours']]
                }, {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    showPoint: false
                });

                new Chartist.Line('.takeprofit-chart', {
                    labels: generateCountArray(r['probabilityData']['takeProfit']),
                    series: [r['probabilityData']['takeProfit'], r['probabilityData']['stoploss'], r['probabilityData']['localPips']]
                }, {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    showPoint: false
                });

                new Chartist.Line('.hl-chart', {
                    labels: generateCountArray(r['probabilityData']['highLow']),
                    series: [r['probabilityData']['highLow'], r['probabilityData']['takeProfit']]
                }, {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    showPoint: false
                });
                new Chartist.Line('.lnhours-chart', {
                    labels: generateCountArray(new Array(13), true),
                    series: [r['probabilityData']['LNHours']['first'], r['probabilityData']['LNHours']['last']]
                }, {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    showPoint: false
                });
                new Chartist.Line('.sthours-chart', {
                    labels: generateCountArray(new Array(10), true),
                    series: [r['probabilityData']['STHours']['first'], r['probabilityData']['STHours']['last']]
                }, {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    },
                    showPoint: false
                });
                console.log(getChartData('', r['probabilityData']['stoploss']));
                var stoplossChart = new CanvasJS.Chart("stoplossChart", {
                    title: {
                        text: "Stoploss Chart"
                    },
                    zoomEnabled: true,
                    axisY :{
                        includeZero:false
                    },
                    data: [
                        {
                            type: "line",
                            dataPoints: getChartData('', r['probabilityData']['stoploss'])
                        }
                    ]
                });

                stoplossChart.render();
                console.log('complete charts');

                /*
                 <div class="buylocalpips-chart"></div>
                 <div class="buystoploss-chart"></div>
                 <div class="buytakeprofit-chart"></div>
                 <div class="selllocalpips-chart"></div>
                 <div class="sellstoploss-chart"></div>
                 <div class="selltakeprofit-chart"></div>
                 */


            }

        });
    }
});

Template.analyze.onCreated(function () {
    this.analyzedData = new ReactiveVar([]);
    this.probabilityData = new ReactiveVar([]);
    this.loading = new ReactiveVar(false);
});

Template.analyze.onRendered = function () {

};