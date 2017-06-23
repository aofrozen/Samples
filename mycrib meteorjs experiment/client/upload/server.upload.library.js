/**
 * Created by aofrozen on 9/24/2015.
 */
deUploadPhoto = {
    'upload' : function(fileName, fileData, type){
        var fs = Meteor.npmRequire('fs'),
            path = Meteor.npmRequire('path'),
            fileIdData = {},
            self = this;
        m.log(process.env.PWD);
        var file = process.env.PWD+'/uploads/'+new Date().getTime()+fileName;
        var fileCompressed =  process.env.PWD+'/uploads/compresssed_'+new Date().getTime()+fileName;
        if(path.extname(file).toLowerCase() != '.jpg' && path.extname(file).toLowerCase() != '.jpeg' && path.extname(file).toLowerCase() != '.gif'  && path.extname(file).toLowerCase() != '.bmp')
        {
            m.log('rejected upload file due to extension is illegal');
            m.err(500, 'Only allowing jpeg/jpg extension');
        }
        /* Write temp file */
        m.log('writing');
        fs.writeFileSync(file, fileData, 'binary');
        m.log('wrote');
        /* Image Validator */
        var imageInfo = self.info(file);
        var width = imageInfo.width;
        var height = imageInfo.height;
        m.log('width: '+width);
        m.log('height: '+height);
        //max width = 1200
        /* Image Converter  */
        if(type == 'photo')
        {
            //Photo
            /* Max: 960px x 960px */
            self.convert([file, '-scale', '960x960', file]);
            /* Image Optimizer */
            self.optimize(file, fileCompressed);
            fileIdData.photo = self.writeFS(fileCompressed);
            //Mobile Photo
            /* Max: 640px x 960px */
            self.convert([file, '-scale', '640x640', file]);
            /* Image Optimizer */
            self.optimize(file, fileCompressed);
            fileIdData.mobilePhoto = self.writeFS(fileCompressed);
            //Thumbnail (Square)
            /* Max: 200px x 200px */
            self.convert([file, '-resize', '200x200^', '-gravity', 'center', '-crop', '200x200+0+0', file]);
            /* Image Optimizer */
            self.optimize(file, fileCompressed);
            fileIdData.thumbnail = self.writeFS(fileCompressed);
        }
        if(type == 'avatar')
        {
            //Thumbnail (Square)
            /* Max: 200px x 200px */
            self.convert([file, '-resize', '300x300^', '-gravity', 'center', '-crop', '300x300+0+0', file]);
            /* Image Optimizer */
            self.optimize(file, fileCompressed);
            fileIdData = self.writeFS(file);
        }
        if(type == 'wall')
        {
            //self.convert([file, '-resize', '50%', file]);
            //Thumbnail (Square)
            /* Max: 1900px x 1280px */
            if(width > 1900 || height > 1280)
            {
                scale = 1900+'x'+1280;
                m.log('scale: '+scale);
                m.log('convert (outside) begins');
                self.convert([file, '-scale', scale, file]);
                m.log('convert (outside) ends');
            }

            /* Image Optimizer */
            m.log('optimize (outside) begins');
            self.optimize(file, fileCompressed);
            m.log('optimize (outside) ends');
            fileIdData.wall = {};
            fileIdData.wall = self.writeFS(fileCompressed);

            /* Max: 640px x 640px */
            if(width > 640 || height > 640)
            {
                scale = 640+'x'+640;
                m.log('scale: '+scale);
                m.log('convert (outside) begins');
                self.convert([file, '-scale', scale, file]);
                m.log('convert (outside) ends');
            }
            /* Image Optimizer */
            self.optimize(file, fileCompressed);
            fileIdData.mobileWall = {};
            fileIdData.mobileWall = self.writeFS(fileCompressed);
        }
        //clean files
        fs.unlink(file);
        fs.unlink(fileCompressed);
        m.log('return begins');
        m.log(fileIdData);
        m.log('return ends');
        return fileIdData;
    },
    'convert' : function(options){
        m.log('sync convert begins');
        var sync = Meteor.wrapAsync(function(options, callback){
            m.log(Imagemagick);
            Imagemagick.convert(options, function(err, stdout){
                m.log('completed convert');
                if (err) throw err;
            });
            callback();
            m.log('imagemagick');
        });
        sync(options);
        m.log('sync convert ends');
    },
    'info' : function(file){
        return Imagemagick.identify(file);
    },
    'optimize' : function(source, dest){
        m.log('optimize begins');
        var cp = Meteor.npmRequire('child_process');
        m.log('sync begins');
        var sync = Meteor.wrapAsync(function(source, dest, callback) {cp.exec('jpeg-recompress '+ source.replace(/ /g, '\\ ')+ ' --method smallfry --quality medium '+dest.replace(/ /g, '\\ '),
            function (error, stdout, stderr) {
                m.log('stdout: ' + stdout);
                m.log('stderr: ' + stderr);
                if (error !== null) {
                    m.log('exec error: ' + error);
                }
                callback();
            })});
        sync(source,dest);
        m.log('sync ends');
    },
    'writeFS' : function(file){
        var weedClient = Meteor.npmRequire("weed-fs"),
            weedfs     = new weedClient({
                server:     "localhost",
                port:       "9333"
            });

        var fileInfoData;
        var sync = Meteor.wrapAsync(function(file, callback){
            weedfs.write(file, function(err, fileInfo) {
                if (err) {
                    console.error(err);
                } else {
                    m.log(fileInfo);
                    m.log(fileInfo.fid);
                    fileInfoData = fileInfo;
                    callback();
                }
            });
        });

        var result = sync(file);
        m.log('result begins');
        m.log(fileInfoData);
        m.log('result ends');
        return fileInfoData;
    },
    'deleteFS' : function(fileId){
        var weedClient = Meteor.npmRequire("weed-fs"),
            weedfs     = new weedClient({
                server:     "localhost",
                port:       "9333"
            });
        weedfs.remove(fileId, function(err, response, body){
            if (err) {
                throw err;
            }
            m.log("removed file.");
        });
    }
};