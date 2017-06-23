/**
 * Created by Justin on 11/16/15.
 */
Template.home.helpers({
    'homeWall' : function(){
        return co.userProfiles.findOne({'userId' : m.uid()}).homeWall.desktop.fid;
    },
    'embedId' : function(){
        var profile = co.userProfiles.findOne({'userId' : m.uid()});
        if(typeof profile.profileWallVideoUrl !== 'undefined')
            return deEmbed.getYoutubeId(profile.profileWallVideoUrl);
        return '';
    }
});

Template.home.rendered = function(){
    deTitle.set('MyCrib');
};