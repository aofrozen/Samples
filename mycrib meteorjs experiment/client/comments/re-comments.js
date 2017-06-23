 Template.reComments.helpers({
   'replyComments': function() {
     return co.comments.find({
       'serviceId': this.serviceId,
       'serviceName': this.serviceName,
       'parentId': this._id
     }, {
       sort: {
         'creationDate': -1
       }
     });
   },
   'moreComments': function() {
     if (_.isUndefined(this.enabledMoreComments) || this.enabledMoreComments === true)
     {
       var commentLimit = Template.instance().commentLimit.get();
       if(_.isUndefined(commentLimit) || commentLimit === '')
       {
         Template.instance().commentLimit.set(Template.instance().loadedCommentCount());
       }
       return this.commentCount > Template.instance().loadedCommentCount();
     }
       return false;
   },
   'parentUserId': function() {
     return Template.parentData(1).parentUserId;
   },
   'loadedCommentCount': function() {
     return Template.instance().loadedCommentCount(); //replaced Template.instance().loadedCommentCount() with reactivevar due to blink
   },
   'initData' : function(){ //NOTE: initData writes helper variables into reactivevar for events, oncreated and rendered to access.
     Template.instance().serviceName.set(this.serviceName);
     Template.instance().serviceId.set(this.serviceId);
   }
 });
 //TODO: Require to complete comment count to support more comment because more comment needs to know how many comments left.
 Template.reComments.events({
   "submit form[name='comment-form']": function(e) {
     console.log('form');
     var commentEl = $(e.currentTarget).find('.comment-field'),
       commentData = {};
       commentData.body = commentEl.val(); //required
       e.preventDefault();
       commentData.serviceName = this.serviceName; //required
       commentData.serviceId = this.serviceId; //required
       commentEl.attr('disabled', true);
       Meteor.call('comment.write', commentData, function(err, result) {
         if (err)
           sAlert.error(err);
         commentEl.attr('disabled', false);
         commentEl.val('');
         Meteor.setTimeout(function () {
             deEmoji.init('input[type=text]');
         }, 200);
       });
   },
   'click .remove-comment': function(e) {
     e.preventDefault();
     var data = {
       'id': $(e.currentTarget).attr('data-id')
     };
     Meteor.call('comment.remove', data, function(err, result) {
       if (err)
         sAlert.error(err);
       Meteor.setTimeout(function () {
           deEmoji.init('input[type=text]');
       }, 200);
     });
   },
   'click .more-comments': function(e) {
     e.preventDefault();
     var next = Template.instance().commentLimit.get();
     if(_.isUndefined(next) || next === '')
     {
       console.log('next is undefined');
       console.log('loaded count is '+Template.instance().loadedCommentCount());
       next = Template.instance().loadedCommentCount() + 5;
       Template.instance().commentLimit.set(next);
     }else{
       console.log('before next is '+next);
       next+=5;
       Template.instance().commentLimit.set(next);
     }
     console.log('next = '+next);
     Meteor.subscribe('comments.read', this.serviceName, this.serviceId, next);
     Meteor.setTimeout(function () {
         deEmoji.init('input[type=text]');
     }, 200);
   },
   'click .reply-comment': function(e) {
     e.preventDefault();
     var commentId = $(e.currentTarget).attr('data-id');
     $('.comment-' + commentId).removeClass('hidden');
     Meteor.setTimeout(function () {
         deEmoji.init('input[type=text]');
     }, 200);
   },
   "submit form[name='reply-comment-form']": function(e) {
       m.log('replied');
       var replyCommentField = $(e.currentTarget).find('.reply-comment-field');
       e.preventDefault();
       if(replyCommentField.val() === '')
        return;
       var data = {
         'commentId': replyCommentField.attr('data-id'),
         'body': replyCommentField.val()
       }; //comment id
       replyCommentField.attr('disabled', true);
       Meteor.call('comment.reply', data, function(err, success) {
         if (err)
           sAlert.error(err);
         replyCommentField.attr('disabled', false);
         replyCommentField.val('');
         Meteor.setTimeout(function () {
             deEmoji.init('input[type=text]');
         }, 200);
       });
   }
 });
 Template.reComments.onCreated(function() {
   var instance = this;
   instance.commentLimit = new ReactiveVar('');
   instance.serviceName = new ReactiveVar('');
   instance.serviceId = new ReactiveVar('');
   instance.autorun(function() {
     instance.loadedCommentCount = function() { //FIXME: NEED TO FIX THIS BECAUSE WHEN DELETE OR ADD THEN MORE COMMENTS WILL BLINK.
       return co.comments.find({
         'serviceName': instance.serviceName.get(),
         'serviceId': instance.serviceId.get()
       }).count();
     };
     instance.commentLimit.set(instance.loadedCommentCount());
   });
 });
