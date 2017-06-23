if (typeof sc === 'undefined') {
    sc = {};
    Handlebars.registerHelper('sc', sc);
}

if (typeof co === 'undefined') {
    co = {};
    Handlebars.registerHelper('co', co);
}

co.archives = new Mongo.Collection('archives');

/*
sc.archives = new SimpleSchema({
    createdAt : {
        type: Date
    },
    instrument : {
        type: String
    },
    days: {
        type: Object
    },
    hours: {
        type: Object
    }
});*/

//co.archives.attachSchema(sc.archives);