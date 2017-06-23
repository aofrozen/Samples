/**
 * Created by Justin on 8/23/15.
 */


Template.emailNotificationsSettings.helpers({
    'emailNotificationsData' : function(){
        return Template.instance().emailNotificationsData();
    }
});

Template.emailNotificationsSettings.onCreated(function(){
	var _i = this;
	_i.autorun(function(){
		_i.emailNotificationsData = function(){
			var userSettings = co.userSettings.findOne({'userId' : m.uid()});
			if(typeof userSettings.emailNotifications !== 'undefined')
			{
				return userSettings.emailNotifications;
			}
		};
	});
});