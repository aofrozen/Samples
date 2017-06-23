/**
 * Created by Justin on 9/25/15.
 */
Template.settingsSideNavigation.events({
    'click .account-settings-btn' : function(e){
        e.preventDefault();
        deModalBox.open('accountSettings', 'accountSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .password-settings-btn' : function(e){
        e.preventDefault();
        deModalBox.open('passwordSettings', 'passwordSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .mobile-settings-btn' : function(e){
        e.preventDefault();
        deModalBox.open('mobileSettings', 'mobileSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .design-settings-btn' : function(e){
        e.preventDefault();
        deModalBox.open('designSettings', 'designSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .email-notifications-settings-btn ' : function(e){
        e.preventDefault();
        deModalBox.open('emailNotificationsSettings', 'emailNotificationsSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .privacy-settings-btn' : function(e){
        e.preventDefault();
        deModalBox.open('securityPrivacySettings', 'securityPrivacySettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .web-notifications-settings-btn' : function(e){
        e.preventDefault();
        deModalBox.open('webNotificationsSettings', 'webNotificationsSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .blocked-accounts-settings-btn ' : function(e){
        e.preventDefault();
        deModalBox.open('blockedAccountsSettings', 'blockedAccountsSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .location-settings-btn' : function(e){
        deModalBox.open('locationSettings', 'locationSettings', {'max-width' : '800px', 'height' : '500px'});
    },
    'click .about-settings-btn' : function(e){
        deModalBox.open('aboutSettings', 'aboutSettings', {'max-width' : '800px', 'height' : '500px'});
    }
});