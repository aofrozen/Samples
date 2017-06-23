Template.userProfile.events({
  'click #addFriend': function(e) {
    e.preventDefault();
    m.log('Client: UserId = ' + m.sget('profileUserId'));
    Meteor.call('friend.sendFriendRequest', m.sget('profileUserId'), function(err, result) {
      m.log('client: addFriendRequest');
      if (err)
        sAlert.error(err);
    });
  },
  'click .remove-friend': function(e) {
    e.preventDefault();
    m.log('Client: UserId = ' + m.sget('profileUserId'));
    Meteor.call('friend.remove', m.sget('profileUserId'), function(err, result) {
      m.log('client: remove friend');
      if (err)
        sAlert.error(err);
    });
  },
  'mouseover .sent-friend-request': function(e) {
    e.preventDefault();
    m.log('hover!');
    $(e.currentTarget).text('Cancel Friend Request');
  },
  'mouseout .sent-friend-request': function(e) {
    e.preventDefault();
    m.log('out!');
    $(e.currentTarget).text('Sent Friend Request');
  },
  'click .profile-friends-btn': function(e) {
    e.preventDefault();
    deModalBox.open('userFriends', '', {
      'width': '100%',
      'max-width': '500px',
      'max-height': '600px',
      'padding': '0px'
    });
  },
  'click .send-message-btn': function(e) {
    e.preventDefault();
    m.log('click messages');
    deModalBox.open('messages', '', {
      'width': '100%',
      'max-width': '900px',
      'padding': '0px'
    });
  },
  'click .block-account-btn': function(e) {
    e.preventDefault();
    m.log('click');
    Meteor.call('account.blockUser', m.sget('profileUserId'), function(err, result) {
      m.log('done');
      m.log(err);
      m.log(result);
      if (err)
        sAlert.error(err);
      if (result)
        sAlert.success(result);
      //$('#profile-options-btn').webuiPopover('hide');
    });
  },
  'click .remove-block-account-btn': function(e) {
      e.preventDefault();
      Meteor.call('account.removeBlock', m.sget('profileUserId'), function(err, result) {
        if (err)
          sAlert.error(err);
        if (result)
          sAlert.success(result);
        //$('#profile-options-btn').webuiPopover('hide');
      })
    }
    /*
     if(m.sget('profile-options-popover-render') == 0)
     {
     m.sset('profile-options-popover-render', 1);
     $('.block-account-btn').on('click', function(e){
     e.preventDefault();
     m.log('click');
     $('#profile-options-btn').webuiPopover('hide');
     Meteor.call('account.blockUser', m.sget('profileUserId'), function(err, result){
     if(err)
     sAlert.error(err);
     if(result)
     sAlert.success(result);
     });
     });
     $('.unblock-account-btn').on('click', function(e){
     e.preventDefault();
     m.log('click');
     $('#profile-options-btn').webuiPopover('hide');
     Meteor.call('account.removeBlock', m.sget('profileUserId'), function(err, result){
     if(err)
     sAlert.error(err);
     if(result)
     sAlert.success(result);
     });
     });

     }
     */
});

Template.userProfile.helpers({
  'fullname': function() {
    return Template.instance().profile().fullname;
  },
  'description': function() {
    return Template.instance().profile().description;
  },
  'age': function() {

  },
  'location': function() {

  },
  'gender': function() {

  },
  'friendCount': function() {
    if (_.isUndefined(Template.instance().profile().stats))
      return 0;
    if (_.isUndefined(Template.instance().profile().stats.friendCount))
      return 0;
    return Template.instance().profile().stats.friendCount;
  },
  'photoCount': function() {
    if (_.isUndefined(Template.instance().profile().stats))
      return 0;
    if (_.isUndefined(Template.instance().profile().stats.photoCount))
      return 0;
    return Template.instance().profile().stats.photoCount;
  },
  'isFriend': function() {
    return Template.instance().isFriend();
  },
  'isFriendRequestSent': function() {
    return Template.instance().isFriendRequestSent();
  },
  'profileWall': function() {
    if (_.isObject(Template.instance().profile()) && Template.instance().profile().hasOwnProperty('profileWall'))
      return Template.instance().profile().profileWall.desktop.fid;
    return '/img/';
  },
  'isUserBlockingYou': function() {
    return co.blockedAccounts.find({
      'userId': m.sget('profileUserId'),
      'blockedUserId': m.uid()
    }).count() > 0;
  },
  'isUserBlocked': function() {
    return co.blockedAccounts.find({
      'userId': m.uid(),
      'blockedUserId': m.sget('profileUserId')
    }).count() > 0;
  }
});

Template.userProfile.rendered = function() {
  m.sset('profile-options-popover-render', 0);
  m.log('rendered');
  deTitle.set(Template.instance().profile().fullname);
};

Template.userProfile.onCreated(function() {
  var instance = this;
  Meteor.subscribe('account.blockedUsers', m.sget('profileUserId'));
  instance.autorun(function() {
    instance.profile = function() {
      return co.userProfiles.findOne({
        'userId': m.sget('profileUserId')
      });
    };
    instance.isFriend = function() {
      return co.friends.find({
        'userId': m.uid(),
        'friendId': m.sget('profileUserId')
      }).count() > 0;
    };
    instance.isFriendRequestSent = function() {
      m.log(co.notifications.find({
        'userId': m.sget('profileUserId'),
        'fromUserId': m.uid(),
        'type': 'friendRequest'
      }).count());
      return co.notifications.find({
        'userId': m.sget('profileUserId'),
        'fromUserId': m.uid(),
        'type': 'friendRequest'
      }).count() > 0;
    };
    instance.blockedAccounts = function() {
      return co.blockedAccounts.find({
        'userId': m.sget('profileUserId')
      });
    };
  });
});
