/**
 * Created by aofrozen on 10/16/2016.
 */
Meteor.methods({
    'analyze': function (pair, spread) {
        /*
         http://aux1.forexfactory.com/api/mda-api/mda.php/chartdata/Agg/EURUSD/D1/5000/no/
         */
        console.log("Server got " + pair + " pair.");
        const regex = /JPY/g;
        var forexModel = new forex();
        var archivesModel = new archives();
        var archiveData = archivesModel.get(pair);
        var now = new Date();
        var daysData, hoursData;
        if(typeof archiveData !== 'undefined' && archiveData.length > 0)
        {
            if(archiveData[0]['createdAt'].getTime() > now.getTime()-(1))
            {
                daysData = archiveData[0]['days'];
                hoursData = archiveData[0]['hours'];

            }else{
                daysData = forexModel.getDays(pair);
                hoursData = forexModel.getHours(pair);
                archivesModel.save(pair, daysData, hoursData);
            }
        }else{
            daysData = forexModel.getDays(pair);
            hoursData = forexModel.getHours(pair);
            archivesModel.save(pair, daysData, hoursData);
        }
        var pipC;
        if (regex.exec(pair) != null) {
            pipC = 100;
        } else {
            pipC = 10000;
        }
        var a = new analyze(pipC);
        var p = new probability();
        var data = {};
        var days = (daysData['data']['bars']);
        var analyzedData = a.run(days, hoursData['data']['bars']);
        var probabilityData = p.run(analyzedData, hoursData['data']['bars'], spread);
        return {
            'probabilityData': {
                'HLHours': probabilityData['HLHours'],
                'HLHoursDifference': probabilityData['HLHoursDifference'],
                //'ratio': probabilityData['ratio'],
                'topBuy': probabilityData['topBuy'],
                'localPips': probabilityData['localPips'],
                'stoploss': probabilityData['stoploss'],
                'takeProfit': probabilityData['takeProfit'],
                'highLow': probabilityData['highLow'],
                'sellOC' : probabilityData['sellOC'],
                'buyOC' : probabilityData['buyOC'],
                'STTakeProfit' : probabilityData['STTakeProfit'],
                'STStoploss' : probabilityData['STStoploss'],
                'LNTakeProfit' : probabilityData['LNTakeProfit'],
                'LNStoploss' : probabilityData['LNStoploss'],
                'STHours' : probabilityData['STHours'],
                'LNHours' : probabilityData['LNHours'],
                'pRatio' : probabilityData['pRatio'],
                'STHL' : probabilityData['STHL'],
                'LNHL' : probabilityData['LNHL'],
                'pipDuration' : probabilityData['pipDuration']

            },
            'analyzedData': analyzedData
        };
    }
});