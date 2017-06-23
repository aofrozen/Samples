deTimelineServer = {
    'post': function (data) {
        co.timeline.insert(data);
    },
    'remove': function (timelineId) {
        co.timeline.remove({'userId': m.uid(), '_id': timelineId});
    },
    'getItem': function (timelineId) {
        return co.timeline.findOne({'_id': timelineId});
    },
    'updateCommentCount' : function(timelineId,c){
        co.timeline.update({'_id' : timelineId}, {$inc : {'stats.commentCount' : c}});
    },
    'updateLikeCount' : function(timelineId, c){
      co.timeline.update({'_id' : timelineId}, {$inc : {'stats.likeCount' : c}});
    },
    'updateShareCount' : function(timelineId, c){
      co.timeline.update({'_id' : timelineId}, {$inc: {'stats.shareCount' : c}});
    },
    'setCommentCount' : function(timelineId, c){
      co.timeline.update({'_id' : timelineId}, {$set: {'stats.commentCount' : c}});
    },
    'setLikeCount' : function(timelineId, c){
      co.timeline.update({'_id' : timelineId}, {$set: {'stats.likeCount' : c}});
    },
    'setShareCount' : function(timelineId, c){
      co.timeline.update({'_id' : timelineId}, {$set: {'stats.shareCount' : c}});
    }
};
