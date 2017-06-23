archives = function(){

};

archives.prototype.save = function(instrument, days, hours){
    co.archives.insert({instrument: instrument, createdAt: new Date(), days : days, hours : hours});
};

archives.prototype.get = function(instrument){
    return co.archives.find({instrument: instrument}, {limit: 1, sort: {createdAt:-1}}).fetch();
};

