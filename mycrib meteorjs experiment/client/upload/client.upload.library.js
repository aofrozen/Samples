/**
 * Created by aofrozen on 9/24/2015.
 */
deUploadFile = {
    'upload' : function (reader, event, method, options) {
        if(_.isObject(options) !== true)
            options = {};
        m.log('options');
        m.log(options);
        var fileData = event.currentTarget.files[0], self = this;
        m.log(event.currentTarget.files);
        m.log(fileData);
        reader.onload = function (fileLoadEvent) {
            m.log('name : '+fileData.name);
            Meteor.call(method, fileData.name, reader.result, options, function(err, success){

            });
        };
        reader.onprogress = function (event) {
            if (event.lengthComputable) {
                //progressNode.max = event.total;
                //progressNode.value = event.loaded;
                m.log(event.loaded);
            }
        };
        reader.readAsBinaryString(fileData);
    },
    'multiupload' : function(x, reader, event, method, options)
    {
        m.log('upload is called '+x);
        if(_.isObject(options) !== true)
            options = {};
        var fileData = event.currentTarget.files[x], self = this;
        reader.onload = function (fileLoadEvent) {
            Meteor.call(method, fileData.name, reader.result, options, function(err, success){
                x++;
                if (event.currentTarget.files.length > x)
                    self.upload(x, reader, event, method);
            });
        };
        reader.onprogress = function (event) {
            if (event.lengthComputable) {
                //progressNode.max = event.total;
                //progressNode.value = event.loaded;
                m.log(event.loaded);
            }
        };
        reader.readAsBinaryString(fileData);
    }
};