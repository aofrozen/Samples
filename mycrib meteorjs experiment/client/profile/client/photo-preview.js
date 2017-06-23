/**
 * Created by aofrozen on 11/14/2015.
 */
Template.photoPreview.events({
  'focus .comment-field': function(e) {
    e.preventDefault();
    m.log('photo comment is focused');
    m.sset('disable-photo-preview-slider', true);
  },
  'blur .comment-field': function(e) {
    e.preventDefault();
    m.log('photo comment is blurred');
    m.sset('disable-photo-preview-slider', false);
  },
  'click .remove-photo-btn': function(e) {
    e.preventDefault();
    m.log('remove photo');
    var data = {
      'id': $(e.currentTarget).attr('data-id')
    };
    Meteor.call('photo.remove', data, function(err, success) {
      if (err)
        sAlert.error(err);
      if (success) {
        sAlert.success('Removed photo');
        deModalBox.close(function() {});
      }
    });
  },
  'click .edit-photo-btn': function(e) {
    e.preventDefault();
    m.log('edit photo');
    m.sset('isPhotoEditable', true);
    m.sset('disable-photo-preview-slider', true);
    Meteor.setTimeout(function() {
      deEmoji.init('input[type=text]');
    }, 200);
  },
  "submit form[name='edit-photo-form']": function(e) {
    e.preventDefault();
    console.log('submit');
    var caption  = $('#caption').val(),
    newAlbum = $('#newAlbum').val(),
    album = $('#albums option:selected').val();
    if(newAlbum !== '')
      {
        selectedPhotoAlbum = newAlbum;
      }else{
        selectedPhotoAlbum = album;
      }
    var data = {'photoId' : m.sget('photo-preview-id'), 'caption' : caption, 'albumName' : selectedPhotoAlbum};
    Meteor.call('photo.update', data, function(err, success){
        if(err)
          sAlert.error(err);
        sAlert.success(success);
        m.sset('isPhotoEditable', false);
        m.sset('disable-photo-preview-slider', false);
    });
  },
  'click .cancel-edit-photo-form-btn' : function(e){
    e.preventDefault();
    m.sset('isPhotoEditable', false);
    m.sset('disable-photo-preview-slider', false);
  },
  'click .profile-link-btn': function(e) {
    e.preventDefault();
    m.log('click profile-link-btn');
    deModalBox.close(function() {
      Router.go('/' + $(e.currentTarget).attr('data-id'));
    });
  },
  'click .previous-arrow': function(e) {
    e.preventDefault();
    m.log('click previous arrow');
    var photoPos = parseInt(m.sget('photo-preview-position')),
      photos = Template.instance().photos(),
      photoCount = parseInt(photos.length);
    photoPos--;
    if (0 > photoPos) {
      m.log('reset b');
      photoPos = (photos.length - 1);
    }
    m.sset('photo-preview-position', photoPos);
  },
  'click .next-arrow': function(e) {
    e.preventDefault();
    m.log('click next arrow');
    var photoPos = parseInt(m.sget('photo-preview-position')),
      photos = Template.instance().photos(),
      photoCount = parseInt(photos.length);
    photoPos++;
    if (photoCount <= photoPos) {
      photoPos = 0;
    }
    m.sset('photo-preview-position', photoPos);
  },
  'click .set-cover-btn': function(e) {
    var albumName = m.sget('photoAlbumName'),
      photoId = m.sget('photo-preview-id'),
      data = {
        'albumName': albumName,
        'photoId': photoId
      };
    Meteor.call('photo.setCover', data, function(err, success) {
      if (err)
        sAlert.error(err);
      if (success)
        sAlert.success(success);
    });
  }
});

Template.photoPreview.helpers({
  'photo': function() {
    var photoId = m.sget('photo-preview-id'),
      photos = Template.instance().photos(),
      photoPos = m.sget('photo-preview-position'),
      x = 0,
      src = '',
      photoVewierEl = $('.photo-viewer'),
      photoEl = $('.photo');
    if (photoPos === -1) {
      //search image
      console.log('searching photo for '+photoId+'...');
      for (x = 0; photos.length > x; x++) {
        if (photoId === photos[x]._id) {
          console.log('found');
          m.sset('photo-preview-position', x);
          src = 'http://img.mycrib.io/' + photos[x].desktop.fid;
        }
      }
    } else {
      console.log('no searching');
      for (x = 0; photos.length > x; x++) {
        if (photoPos === x) {
          m.sset('photo-preview-id', photos[x]._id);
          m.sset('photo-preview-position', x);
          src = 'http://img.mycrib.io/' + photos[x].desktop.fid;
        }
      }
    }
    photoEl.on('load', function() {
      console.log('image is loaded');
      if (photoEl.width() > photoEl.height()) {
        //width is longer
        console.log('width');
        console.log(photoEl.width());
        photoVewierEl.addClass('photo-width');
        photoVewierEl.removeClass('photo-height');
      } else {
        //height is longer
        console.log('height');
        console.log(photoEl.height());
        photoVewierEl.removeClass('photo-width');
        photoVewierEl.addClass('photo-height');
      }
    }).attr('src', src);

  },
  'selectedAlbumName' : function(){
    return (this.albumName === Template.parentData(1).albumName) ? 'selected' : '';
  },
  'photoUser': function() {
    return Template.instance().photo();
  },
  'comments': function() {
    return co.comments.find({
      'serviceId': m.sget('photo-preview-id'),
      'serviceName': 'photo',
      'parentId': {
        $exists: false
      }
    }, {
      sort: {
        'creationDate': -1
      }
    });
  },
  'commentCount': function() { //NOTE: EXAM THIS IF IT WORKS RIGHT.
    console.log(Template.instance().photo());
    if (_.has(Template.instance().photo(), 'stats') && _.has(Template.instance().photo().stats, 'commentCount'))
      return Template.instance().photo().stats.commentCount;
    return 0;
  },
  'photoId': function() {
    return m.sget('photo-preview-id');
  },
  'photoUserId': function() {
    return Template.instance().photo().userId;
  },
  'isPhotoEditable': function() {
    return m.sget('isPhotoEditable');
  },
  'albumNames': function() {
    return Template.instance().albumNames();
  }
});

Template.photoPreview.onCreated(function() {
  var instance = this;
  Meteor.setTimeout(function() {
    deEmoji.init('input[type=text]');
  }, 200);
  m.sset('isPhotoEditable', false);
  instance.autorun(function() {

    //if scoped photos exists then load specific photos via subscribe
    Meteor.subscribe('comments.read', 'photo', m.sget('photo-preview-id'));
    Meteor.subscribe('photo.photoAlbums', m.sget('profileUserId'));
    instance.photos = function() {
      //find only specific photos
      return co.photos.find({
        'userId': m.sget('profileUserId')
      }, {sort: {'creationDate': -1}}).fetch();
    };
    instance.photo = function() {
      return co.photos.findOne({
        'userId': m.sget('profileUserId'),
        '_id': m.sget('photo-preview-id')
      });
    };
    instance.albumNames = function() {
      return co.photoAlbums.find({
        'userId': m.uid()
      });
    };
  });
  $(window).bind("keydown.photo", function(e) {
    // use e.which
    if (m.sget('disable-photo-preview-slider') === false) {
      var photoPos = parseInt(m.sget('photo-preview-position')),
        photos = instance.photos(),
        photoCount = parseInt(photos.length);
      m.log('photoCount: ' + photoCount);
      m.log('photo total: ' + photos.length);
      if (e.which === 37) //previous
      {
        m.log('previous');
        photoPos--;
        m.log('photoPos: ' + photoPos);
        if (0 > photoPos) {
          m.log('reset b');
          photoPos = (photos.length - 1);
          m.log('photoPos: ' + photoPos);
        }
      }
      if (e.which === 39) //next
      {
        m.log('next');
        photoPos++;
        m.log('photoPos: ' + photoPos);
        if (photoCount <= photoPos) {
          photoPos = 0;
          m.log('photoPos: ' + photoPos);
        }
      }
      /*
      photoCount = 10

      when photoPos is increased to 9
      then photoPos 9 > 10 photoCount
       false
       */
      m.sset('photo-preview-position', photoPos);
    }
  });
});
