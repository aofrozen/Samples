forex = function(){

};
/*
Backup
 http://www.investing.com/charts/forex-charts
 */

forex.prototype.getDay = function(pair){
    var d = new Date();
    console.log('http://aux1.forexfactory.com/api/mda-api/mda.php/chartdata/Agg/'+pair+'/D1/1/no/'+d.getTime());
    return HTTP.get('http://www.forexfactory.com/mdaapi.php?api=chartdata/Agg/'+pair+'/D1/1/no/'+d.getTime());
};

forex.prototype.getDays = function(pair){
   // var csv = data;
    var d = new Date();
    console.log('http://aux1.forexfactory.com/api/mda-api/mda.php/chartdata/Agg/'+pair+'/D1/5000/no/'+d.getTime());
    return HTTP.get('http://www.forexfactory.com/mdaapi.php?api=chartdata/Agg/'+pair+'/D1/5000/no/'+d.getTime());
    //console.log(raw['content']);
};

forex.prototype.getHours = function(pair){
  //  var csv = data;
    var d = new Date();
    return HTTP.get('http://www.forexfactory.com/mdaapi.php?api=chartdata/Agg/'+pair+'/H1/5000/no/'+d.getTime());
};