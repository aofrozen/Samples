"strict mode";

Template.reTimeline.helpers({
    'comments': function () {
        return co.comments.find({
            'serviceId': this._id,
            'serviceName': 'timeline',
            'parentId': {$exists: false}
        }, {sort: {'creationDate': -1}});
    },
    'commentCount' : function(){
      if(_.has(this, 'stats') && _.has(this.stats, 'commentCount'))
        return this.stats.commentCount;
      return 0;
    },
    'embedExists' : function(){
        return typeof this.embed.link !== 'undefined';
    },
    'isEmbedVideo': function () {
        if (_.isUndefined(this.embed) || _.isUndefined(this.embed.type))
            return false;
        return this.embed.type == 'video';
    }
});

Template.reTimeline.events({
    'click .embed-video-btn': function (e) {
        e.preventDefault();
        m.log('clicked embed video');
        m.sset('timeline-id', $(e.currentTarget).attr('data-id'));
        deModalBox.open('embedVideo', 'embedVideo', {
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
    'click .embed-article-btn': function (e) {
        e.preventDefault();
        m.log('clicked embed article');
        window.open(co.timeline.findOne({'_id': $(e.currentTarget).attr('data-id')}).embed.link, '_blank');
    },
    'click .remove-timeline-post': function (e) {
        e.preventDefault();
        var data = {'id': $(e.currentTarget).attr('data-id')}; //timeline post id
        Meteor.call('timeline.remove', data, function (err, result) {
        });
    }
});

Template.reTimeline.rendered = function () {
    Meteor.setTimeout(function () {
        deEmoji.init('input[type=text]');
    }, 200);
    var timelineScroll = deInfiniteScroll.create(window, '.timeline', 100); //need to fix this
    timelineScroll.setLoad(function () {
        m.log('triggered scroll!');
        m.log(m.sget('timelineLimit'));
        if (co.timeline.find({'userId': {$in: deFollowsClient.getFollowIds()}}).count() >= m.sget('timelineLimit'))
            m.sset('timelineLimit', 10 + m.sget('timelineLimit'));
    });
    timelineScroll.start();
    deCache.save(function () {
        timelineScroll.remove();
    });
};
