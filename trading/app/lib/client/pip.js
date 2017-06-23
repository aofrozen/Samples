pipConverter = function(pair){
    const regex = /JPY/g;
    var pipC;
    if (regex.exec(pair) != null) {
        pipC = 100;
    } else {
        pipC = 10000;
    }
    return pipC;
};

String.prototype.toHHMMSS = function () {

};

Handlebars.registerHelper('_dateFormat', function (date) {
    return moment(date).calendar();
});

Handlebars.registerHelper('_dateAgo', function (date) {
    if(typeof date !== 'undefined')
    {
        var d = date;
        var n = new Date();
        var ts = Math.round((n.getTime()-d.getTime())/1000);
        var sec_num = parseInt(ts, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+'H '+minutes+'M '+seconds+'S';
    }
});

Handlebars.registerHelper('_dateAgoC', function (sdate, date) {
    if(typeof date !== 'undefined')
    {
        var d = sdate;
        var n = date;
        var ts = Math.round((n.getTime()-d.getTime())/1000);
        var sec_num = parseInt(ts, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+'H '+minutes+'M '+seconds+'S';
    }
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMM DD ddd, YYYY');
});

Template.registerHelper('formatDateTime', function(date) {
    return moment(date).format('MMM DD, YYYY h:hh A');
});

