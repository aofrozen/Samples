"strict mode";

Template.homeTimeline.helpers({
    'timelineData': function () {
        return Template.instance().timelineData();
    },
    'isTimelineLoaded' : function(){
        return Template.instance().loaded.get();
    }
});

Template.homeTimeline.onCreated(function () {
    var instance = this;
    instance.loaded = new ReactiveVar(false);
    m.sset('timelineLimit',10);
    instance.autorun(function () {
        _timelineSub = Meteor.subscribe('timeline', m.uid(), m.sget('timelineLimit'));
        instance.loaded.set(_timelineSub.ready());
        instance.timelineData = function () {
            return co.timeline.find({'userId' : {$in: _.map(co.follows.find({'userId' : m.uid()}).fetch(), function(follows) { return follows.followId; })}}, {sort: {'creationDate': -1}, limit: m.sget('timelineLimit')});
        };
        instance.profile = function () {
            return co.userProfiles.findOne({'userId': m.uid()});
        };
    });
});