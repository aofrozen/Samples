/**
 * Created by Justin on 11/27/15.
 */
Template.classicComments.rendered = function () {
    Meteor.setTimeout(function () {
        deEmoji.init('input[type=text]');
    }, 200);
    var commentsScroll = deInfiniteScroll.create(window, '.comments', 100);
    commentsScroll.setLoad(function () {
        if (co.classicComments.find({'userId': m.sget('profileUserId')}).count() >= m.sget('profileCommentLimit'))
            m.sset('profileCommentLimit', 10 + m.sget('profileCommentLimit'));
    });
    commentsScroll.start();
    deCache.save(function () {
        commentsScroll.remove();
    });
};

Template.classicComments.events({
    'keydown .comment-field': function (e) {
        var commentEl = $(e.currentTarget), commentData = {};
        if (e.keyCode === 13) {
            m.log('submit comment');
            commentData.body = commentEl.val();
            e.preventDefault();
            commentData.userId = m.sget('profileUserId');
            commentEl.attr('disabled', true);
            Meteor.call('profile.writeComment', commentData, function (err, result) {
                commentEl.attr('disabled', false);
                commentEl.val('');
            });
        }
    },
    'click .remove-comment': function (e) {
        e.preventDefault();
        var data = {'id': $(e.currentTarget).attr('data-id')};
        Meteor.call('profile.removeComment', data, function (err, result) {
            if (err) {
                sAlert.error(err);
            }
        });
    }
});

Template.classicComments.helpers({
    'classicComments': function () {
        return Template.instance().classicComments();
    }
});

Template.classicComments.onCreated(function () {
    var instance = this;
    m.sset('profileCommentLimit',5);
    instance.autorun(function () {
        Meteor.subscribe('profile.getClassicComments', m.sget('profileUserId'), m.sget('profileCommentLimit'));
        instance.classicComments = function () {
            return co.classicComments.find({
                'userId': m.sget('profileUserId')
            }, {sort: {'creationDate': -1}, limit: m.sget('profileCommentLimit')});
        };
    });
});