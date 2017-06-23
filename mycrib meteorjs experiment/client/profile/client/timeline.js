/**
 * HELPERS
 */

Template.profileTimeline.helpers({
    'timelineData': function () {
        return Template.instance().timelineData();
    },
    'isTimelineLoaded' : function(){
        return Template.instance().timelineLoaded.get();
    }
});

Template.profileTimeline.onCreated(function () {
    var instance = this;
    instance.timelineLoaded = new ReactiveVar(false);
    m.sset('timelineLimit', 10);
    instance.autorun(function () {
        _timelineSub = Meteor.subscribe('timeline.self', m.sget('profileUserId'), m.sget('timelineLimit'));
        instance.timelineLoaded.set(_timelineSub.ready());
        instance.timelineData = function () {
            return co.timeline.find({'userId': m.sget('profileUserId')}, {sort: {'creationDate': -1}});
        };
        instance.profile = function () {
            return co.userProfiles.findOne({'userId': m.sget('profileUserId')});
        };
    });
});