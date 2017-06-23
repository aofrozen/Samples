/**
 * Created by Justin on 12/10/15.
 */
Meteor.methods({
  'admin.updateSafeUser': function(userId, isSafe) {
    console.log('called admin.updateSafeuser');
    /*
    if(!Roles.userIsInRole(Meteor.user(), ['admin-user']))
    {
        throw new Meteor(403, "Access denied");
    } */
    console.log(userId);
    console.log(co.userProfiles.update({
      'userId': userId
    }, {
      $set: {
        'safeAccount': true
      }
    }));
  },
  'admin.disableAccount': function(userId) {
    if (!Roles.userIsInRole(Meteor.user(), ['admin-user'])) {
      throw new Meteor(403, "Access denied");
    }
    //remove avatar user

    //change name
    co.userProfiles.update({
      'userId': userId
    }, {
      $set: {
        'disabledAccount': true
      }
    });
  },
  'admin.enableAccount': function(userId) {
    if (!Roles.userIsInRole(Meteor.user(), ['admin-user'])) {
      throw new Meteor(403, "Access denied");
    }
    co.userProfiles.update({
      'userId': userId
    }, {
      $set: {
        'disabledAccount': false
      }
    });
  },
  'admin.addUserToRole': function(userId) {
    if (!Roles.userIsInRole(Meteor.user(), ['admin-user'])) {
      throw new Meteor(403, "Access denied");
    }
    Roles.setUserRoles(userId, ['admin-user'], 'group');
  },
  'admin.removeUserFromRole': function(userId) {
    if (!Roles.userIsInRole(Meteor.user(), ['admin-user'])) {
      throw new Meteor(403, "Access denied");
    }
    Roles.setUserRoles(userId, [], 'group');
  },
  'system.recountAll': function() {
    m.log('called system.recountAll');
    var profiles = co.userProfiles.find({}).fetch();
    var userId, friendCount, timelinePosts, photoCommentCount, timelineCommentCount;
    profiles.forEach(function(profile) {
      userId = profile.userId;

      //recount classic comments
      classicCommentCount = co.classicComments.find({'userId' : userId}).count();

      //recount photo albums
      photoAlbumCount = co.photoAlbums.find({
        'userId': userId
      }).count();

      //recount photos
      photoCount = co.photos.find({
        'userId': userId
      }).count();

      //recount friend
      friendCount = co.friends.find({
        'userId': userId
      }).count();

      //recount follow
      followCount = co.follows.find({
        'userId': userId
      }).count();

      co.userProfiles.update({
        'userId': userId
      }, {
        $set: {
          'stats.photoCount': photoCount,
          'stats.friendCount': friendCount,
          'stats.folowCount': followCount,
          'stats.photoAlbumCount': photoAlbumCount,
          'stats.commentCount' : classicCommentCount
        }
      });
    });
    m.log('Recounting timeline comments');
    timelinePosts = co.timeline.find({}).fetch();
    timelinePosts.forEach(function(post) {
      timelineCommentCount = co.comments.find({
        'serviceName': 'timeline',
        'serviceId': post._id,
        'parentId': {
          $exists: false
        }
      }).count();
      m.log('timeline comment count: ' + timelineCommentCount + ' and ' + post._id);
      co.timeline.update({
        '_id': post._id
      }, {
        $set: {
          'stats.commentCount': timelineCommentCount
        }
      });
    });
    m.log('Recounting photos');
    photos = co.photos.find({}).fetch();
    photos.forEach(function(photo) {
      photoCommentCount = co.comments.find({
        'serviceName': 'photo',
        'serviceId': photo._id,
        'parentId': {
          $exists: false
        }
      }).count();
      m.log('photo count: ' + photoCommentCount + ' and ' + photo._id);
      co.photos.update({
        '_id': photo._id
      }, {
        $set: {
          'stats.commentCount': photoCommentCount
        }
      });
    });
    m.log('recounting photo albums');
    photoAlbums = co.photoAlbums.find({}).fetch();
    photoAlbums.forEach(function(item){
      photoCount = co.photos.find({'albumName' : item.albumName, 'userId' : item.userId}).count();
      m.log('photo album count: '+photoCount+' and '+item.albumName);
      co.photoAlbums.update({'userId' : item.userId, 'albumName' : item.albumName}, {$set: { 'stats.photoCount' : photoCount}});
    });
  }
});
