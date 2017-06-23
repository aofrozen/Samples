/**
 * Created by aofrozen on 11/14/2015.
 */
Template['yt.profilePhotos'].events({
    'click .back-btn' : function(e){
        e.preventDefault();
        Router.go('/profile/'+m.sget('profileUserId')+'/photos');
    },
    'click .upload-btn' : function(e){
        deModalBox.open('uploadPhoto', '', {'width' : '100%', 'max-width' : '500px', 'height' : '400px', 'padding' : '0px'});
    },
    'click .photo-preview-btn' : function(e){
        e.preventDefault();
        m.log('clicked photo review btn');
        console.log($(e.currentTarget).attr('data-id'));
        Session.set('photo-preview-id', $(e.currentTarget).attr('data-id'));
        m.sset('photo-preview-position', -1);
        m.sset('disable-photo-preview-slider', false);
        deModalBox.setBeforeClose(function(){ m.log('unbinding photo'); $(window).unbind('keydown.photo');m.sset('isPhotoEditable', false);});
        deModalBox.open('photoPreview', 'photoPreview', {
            'width': '100%',
            'overflow': 'auto',
            'background': 'transparent',
            'height': 'auto',
            'margin': 'auto',
            'max-width': '100%',
            'padding': '0px'
        },
        true);
    },
    'click .remove-photo-tag-btn' : function(e){
        e.preventDefault();
        m.log('click remove tag name');
        if(confirm("Are you sure that you want to remove this photo album?"))
        {
            var data = {'albumName' : m.sget('photoAlbumName')};
            Meteor.call('photo.removeAlbum', data, function(err, success){
                if(err)
                {
                    sAlert.error(err);
                }
                Router.go('/profile/'+m.sget('profileUserId')+'/photos');
            });
        }
    }
});

Template['yt.profilePhotos'].helpers({
    'profileUserId' : function(){
        return m.sget('profileUserId');
    },
    'photos' : function(){
        return Template.instance().photos();
    },
    'thumbnailUrl' : function(){
        return 'http://img.mycrib.io/'+this.thumbnail.fid;
    },
    'albumName' : function(){
        return m.sget('photoAlbumName');
    },
    'isAllPhotosPageActive' : function()
    {
        return m.sget('allPhotosEnabled');
    }
});

Template['yt.profilePhotos'].onCreated(function(){
    var instance = this;
    instance.autorun(function(){
        if(m.sget('allPhotosEnabled'))
        {
            Meteor.subscribe('photo.allphotos', m.sget('profileUserId'));
        }else{
            Meteor.subscribe('photo.photos', m.sget('profileUserId'), m.sget('photoAlbumName'));
        }

       instance.photos = function(){
           if(m.sget('allPhotosEnabled'))
           {
               return co.photos.find({'userId' : m.sget('profileUserId')}, {sort : {'creationDate' : -1}});
           }else{
               return co.photos.find({'userId' : m.sget('profileUserId'), 'albumName' :  m.sget('photoAlbumName')}, {sort: {'creationDate' : -1}});
           }

       };
       var hash = m.sget('hash');
       if(hash !== '#main' && hash !== '' && _.isUndefined(hash) === false && hash !== null )
       {
           m.sset('photo-preview-id', hash.replace('#', ''));
           m.sset('photo-preview-position', -1);
           m.sset('disable-photo-preview-slider', false);
           deModalBox.setBeforeClose(function(){ m.log('unbinding photo'); $(window).unbind('keydown.photo'); m.sset('isPhotoEditable', false); m.sset('hash', '')});
           deModalBox.open('photoPreview', 'photoPreview', {
               'width': '100%',
               'overflow': 'auto',
               'background': 'transparent',
               'height': 'auto',
               'margin': 'auto',
               'max-width': '100%',
               'padding': '0px'
           },
           true);
       }
    });
});
