/**
 * Created by Justin on 8/23/15.
 */
Template.designSettings.events({
    'submit #design-settings-form': function (e) {
        e.preventDefault();
        m.log('submit');
        var home_cover_options = $('input[name="home-cover-options"]').val(),
            profile_cover_options = $('input[name="profile-cover-options"]').val();
    },
    "change .upload-profile-wall": function (e) {
        var reader = new FileReader();
        deUploadFile.upload(reader, e, 'settings.uploadProfileWall', {}, 'profile-wall-upload-progress', function(err, result){
            if(result)
            {
                sAlert.success('Uploaded');
                m.sset('profile-wall-upload-progress', 0);
            }
            if(err)
            {
                sAlert.error(err);
            }
        });
    },
    "change .upload-user-avatar" : function(e){
        var reader = new FileReader();
        deUploadFile.upload(reader, e, 'settings.uploadUserAvatar', {}, 'user-avatar-upload-progress', function(err, result){
            if(result)
            {
                sAlert.success('Uploaded');
                m.sset('user-avatar-upload-progress', 0);
            }
            if(err)
            {
                sAlert.error(err);
            }
        });
    },
    "change .upload-home-wall" : function(e){
        var reader = new FileReader();
        deUploadFile.upload(reader, e, 'settings.uploadHomeWall', {}, 'home-wall-progress', function(err, result){
            if(result)
            {
                sAlert.success('Uploaded');
                m.sset('home-wall-progress',0);
            }
            if(err)
            {
                sAlert.error(err);
            }
        });
    },
    "change .profile-cover-option" : function(e){
        e.preventDefault();
        m.log('changed');
        var selected = $("input[name='profile-cover-option']:checked").val();
        m.log(selected);
        if(selected == 'Photo')
        {
            $('.profile-photo-wall-container').removeClass('hidden');
            $('.profile-video-wall-container').addClass('hidden');
        }else{
            $('.profile-photo-wall-container').addClass('hidden');
            $('.profile-video-wall-container').removeClass('hidden');
        }
        m.call('settings.updateProfileWallOption', selected);
    },
    "change .home-cover-option": function(e){
        e.preventDefault();
        m.log('changed');
        var selected = $("input[name='home-cover-option']:checked").val();
        m.log(selected);
        if(selected == 'Photo')
        {
            $('.home-photo-wall-container').removeClass('hidden');
            $('.home-video-wall-container').addClass('hidden');
        }else{
            $('.home-photo-wall-container').addClass('hidden');
            $('.home-video-wall-container').removeClass('hidden');
        }
        m.call('settings.updateHomeWallOption', selected);
    },
    "change input[name='home-video-wall-url']" : function(e){
        m.log('changed home video wall url');
        var url = $('#home-video-wall-url').val();
        m.call('settings.updateHomeVideoWallUrl', url);
    },
    "change input[name='profile-video-wall-url']" : function(e){
        m.log('changed profile video wall url');
        var url = $('#profile-video-wall-url').val();
        m.call('settings.updateProfileVideoWallUrl', url);
    }
});

Template.designSettings.helpers({
    'uploadProfileWall' : function(){
        return m.sget('profile-wall-upload-progress');
    },
    'uploadUserAvatarProgress' : function(){
        return m.sget('user-avatar-upload-progress');
    },
    'uploadHomeWallProgress' : function(){
        return m.sget('home-wall-progress');
    },
    'profileVideoWallUrl' : function(){
        return co.userProfiles.findOne({'userId' : m.uid()}).profileWallVideoUrl;
    },
    'homeVideoWallUrl' : function(){
        return co.userProfiles.findOne({'userId' : m.uid()}).homeWallVideoUrl;
    }
});

Template.designSettings.onCreated(function(){
    m.sset('home-wall-progress', 0);
    m.sset('user-avatar-upload-progress', 0);
    m.sset('profile-wall-upload-progress', 0);
});

Template.designSettings.rendered = function(){
    var design = co.userProfiles.findOne({'userId' : m.uid()});
    $(".profile-cover-option[value='"+design.profileWallOption+"']").prop('checked', true);
    $(".home-cover-option[value='"+design.homeWallOption+"']").prop('checked', true);
    if(design.homeWallOption == 'Photo')
    {
        $('.home-photo-wall-container').removeClass('hidden');
        $('.home-video-wall-container').addClass('hidden');
    }else{
        $('.home-photo-wall-container').addClass('hidden');
        $('.home-video-wall-container').removeClass('hidden');
    }
    if(design.profileWallOption == 'Photo')
    {
        $('.profile-photo-wall-container').removeClass('hidden');
        $('.profile-video-wall-container').addClass('hidden');
    }else{
        $('.profile-photo-wall-container').addClass('hidden');
        $('.profile-video-wall-container').removeClass('hidden');
    }
};