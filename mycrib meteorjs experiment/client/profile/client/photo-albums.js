/**
 * Created by aofrozen on 11/14/2015.
 */
Template['yt.profilePhotoAlbums'].events({
   'click .upload-btn' : function(e){
      deModalBox.open('uploadPhoto', '', {'width' : '100%', 'max-width' : '500px', 'height' : '400px', 'padding' : '0px'});
   }
});

Template['yt.profilePhotoAlbums'].helpers({
   'photoAlbums' : function(){
      return Template.instance().photoAlbums();
   },
   'thumbnailUrl' : function(){
      var photoAlbum = co.photoAlbums.findOne({'_id' : this._id});
      return (_.isObject(photoAlbum.cover)) ? 'http://img.mycrib.io/'+photoAlbum.cover.fid : '/img/avatar2.jpg';
   }
});

Template['yt.profilePhotoAlbums'].onCreated(function(){
   var _i = this;
   Meteor.subscribe('photo.photoAlbums', m.sget('profileUserId'));
   _i.autorun(function(){
      _i.photoAlbums = function(){
         return co.photoAlbums.find({'userId' : m.sget('profileUserId')});
      };
   });
});
