/**
 * Created by scvjustin on 11/15/2015.
 */
Template.uploadPhoto.events({
   'click .upload-btn' : function(e){
       m.log('upload');
        $('#upload-file').trigger('click');
   },
    'change #upload-file' : function(e){
        m.log('uploading...');
        m.sset('isUploadPhotoProgress', true);
        var reader = new FileReader(),
            newAlbum = $('#newAlbum').val(),
            selectedAlbum = $('#albumNames option:selected').val(),
            albumName,
            options;
        albumName = (newAlbum) ? newAlbum : selectedAlbum;
        options = {'albumName' : albumName};
        m.sset('_multiuploadFileCountTotal', $("input:file")[0].files.length);
        deUploadFile.multiupload(0, reader, e, 'photo.upload', 'uploadPhotoProgress', options, function(err, result, options){
            if(err)
                sAlert.error(err);
            m.log(result);
            if(result){
                m.log(options);
                sAlert.success('All photos are uploaded.');
                m.sset('_multiuploadFileCountTotal', 0);
                m.sset('_multiuploadUploadedCount', 0);
                m.sset('uploadPhotoProgress', 0);
            }
        });
    }
});

Template.uploadPhoto.helpers({
   'albumNames' : function(){
       m.log(Template.instance().albumNames());
        return Template.instance().albumNames();
   },
    'uploadPhotoProgress' : function(){
        return m.sget('uploadPhotoProgress');
    },
    '_multiuploadUploadedCount' : function(){
        return m.sget('_multiuploadUploadedCount');
    },
    '_multiuploadFileCountTotal' : function(){
        return m.sget('_multiuploadFileCountTotal');
    },
    'isUploadPhotoProgress' : function(){
      return m.sget('isUploadPhotoProgress');
    }
});

Template.uploadPhoto.onCreated(function(){
    var instance = this;
    m.sset('_multiuploadFileCountTotal', 0);
    m.sset('_multiuploadUploadedCount', 0);
    m.sset('uploadPhotoProgress', 0);
    Meteor.subscribe('photo.photoAlbums', m.uid());
    instance.autorun(function(){
       instance.albumNames = function(){
           return co.photoAlbums.find({'userId' : m.uid()});
       };
    });
});
