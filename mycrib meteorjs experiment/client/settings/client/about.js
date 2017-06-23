"use strict";

Template.aboutSettings.helpers({
    'years' : function(){
        var yearCount = 110,
            currentYear = new Date().getFullYear()-1,
            years = [],
            x;
        for(x=0;x<yearCount;x++)
        {
            years[x] = [];
            years[x]['year'] = currentYear - x;
        }
        return years;
    },
    'description' : function(){
        return co.userProfiles.findOne({'userId' : m.uid()}).description;
    }
});

Template.aboutSettings.events({
    'click .save-about-btn' : function(e){
        e.preventDefault();
        m.log('click save about btn')
    },
    'click .add-interest-category-btn' : function(e){
        e.preventDefault();
        m.log('click add interest category');
    },
    'submit .about-settings-form' : function(e){
        e.preventDefault();
        var month = $('#month option:selected').val(),
            day = $('#day option:selected').val(),
            year = $('#year option:selected').val(),
            description = $('#description').val(),
            gender = $('input[name="gender"]:checked').val();

        var data = {'month' : month, 'day' : day, 'year' : year, 'description' : description, 'gender' : gender};
        m.log('submit');
        Meteor.call('settings.updateAbout', data, function(err, success){
            if(err)
                sAlert.error(err);
            if(success)
                sAlert.success('Saved');
        });
    }
});

Template.aboutSettings.rendered = function(){
    var profile = co.userProfiles.findOne({'userId' : m.uid()}),
        birthday = new Date(profile.birthday);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    $('#month option[value='+months[birthday.getUTCMonth()]+']').prop('selected', true);
    $('#day option[value='+birthday.getUTCDate()+']').prop('selected', true);
    $('#year option[value='+birthday.getUTCFullYear()+']').prop('selected', true);

    $(".gender input[value='"+profile.gender+"']").prop('checked', true);

};