/**
 * Created by aofrozen on 10/15/2015.
 */
Template.locationSettings.helpers({
    'locationData': function () {
        return Template.instance().locationData();
    }
});


Template.locationSettings.onCreated(function () {
    var _i = this;
    _i.autorun(function () {
        _i.locationData = function () {
            var userProfile = co.userProfiles.findOne({'userId': m.uid()});
            return userProfile;
        }
    });
});

Template.locationSettings.rendered = function(){
    VazcoMaps.init({'libraries' : 'places', 'key' : 'AIzaSyC9dSt-aaQPrb2oMpMZyIZg09oDiSxzYXA'}, function() {
        $("#location").geocomplete();
    });
};
