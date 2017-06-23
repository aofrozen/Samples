/**
 * Created by Justin on 12/9/15.
 */
Template['yt.posts'].helpers({
   'commentCount' : function(){
       if(_.isUndefined(Template.instance().profile().stats) || _.isUndefined(Template.instance().profile().stats.commentCount))
           return 0;
       return Template.instance().profile().stats.commentCount;
   }
});

Template['yt.posts'].onCreated(function(){
    var instance = this;
    instance.autorun(function() {
        instance.profile = function () {
            return co.userProfiles.findOne({'userId': m.sget('profileUserId')});
        };
    });
});