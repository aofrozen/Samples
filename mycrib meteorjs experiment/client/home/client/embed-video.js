/**
 * Created by Justin on 11/19/15.
 */
Template.embedVideo.rendered = function(){
    Meteor.setTimeout(function(){
        deEmbed.convert('.embed-video');
        deEmoji.init('input[type="text"]');
    }, 500);
};

Template.embedVideo.onCreated(function(){
   var instance = this,
       rows = 50;
    instance.autorun(function(){
        Meteor.subscribe('timeline.comments', m.sget('timeline-id'), rows);
        instance.embedVideo = function(){
            var data = co.timeline.findOne({'_id' : m.sget('timeline-id')});
            return data.embed;
        };
        instance.timeline = function(){
            return co.timeline.findOne({'_id' : m.sget('timeline-id')});
        };
    })
});

Template.embedVideo.helpers({
    'embedVideo' : function(){
        return Template.instance().embedVideo();
    },
    'hostUserId' : function(){
        return Template.instance().timeline().userId;
    },
    'embedTitle' : function(){
        return Template.instance().embedVideo().title;
    },
    'embedLink' : function(){
        return Template.instance().embedVideo().link;
    },
    'embedHTML' : function(){
        return Template.instance().embedVideo().html;
    },
    'embedDate' : function(){
        return Template.instance().timeline().creationDate;
    },
    'comments': function () {
        return co.comments.find({'serviceId': m.sget('timeline-id'), 'serviceName' : 'timeline'}, {sort: {'creationDate': -1}});
    },
    'timelineId' : function(){
        return m.sget('timeline-id');
    },
    'hostCaption' : function(){
        return Template.instance().timeline().body;
    }
});

Template.embedVideo.events({
    'keydown .comment-field': function (e) {
        var commentEl = $(e.currentTarget), commentData = {};
        if (e.keyCode === 13) {
            m.log('submit comment');
            commentData.body = commentEl.val();
            e.preventDefault();
            commentData.serviceName = 'timeline';
            commentData.serviceId = $(e.currentTarget).attr('data-id');
            commentEl.attr('disabled', true);
            Meteor.call('timeline.writeComment', commentData, function (err, result) {
                commentEl.attr('disabled', false);
                commentEl.val('');
            });
        }
    },
    'click .remove-comment': function (e) {
        e.preventDefault();
        var data = {'id': $(e.currentTarget).attr('data-id')};
        Meteor.call('timeline.removeComment', data, function (err, result) {

        });
    },
    'click .reply-comment': function (e) {
        e.preventDefault();
        var data = {'parentId': $(e.currentTarget.attr('data-parent-id'))};
        Meteor.call('timeline.replyComment', data, function (err, result) {

        });
    },
    'click .close-modal' : function(e){
        e.preventDefault();
        deModalBox.close(function(){
            Router.go(e.currentTarget.href);
        });
    }
});