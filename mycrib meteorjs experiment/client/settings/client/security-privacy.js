/**
 * Created by scvjustin on 8/26/2015.
 */
Template.securityPrivacySettings.helpers({
    'securityPrivacyData' : function(){
        return Template.instance().securityPrivacyData();
    }
});

Template.securityPrivacySettings.onCreated(function(){
    var _i = this;
    _i.autorun(function(){
        _i.securityPrivacyData = function(){ return co.userSettings.findOne({'userId': m.uid()}).privacy; };
    });
});
