/**
 * Created by aofrozen on 11/6/2015.
 */
/*
 Package.describe({
 name: 'dangrossman:bootstrap-daterangepicker',
 version: '2.0.12',
 summary: 'Date range picker component for Bootstrap',
 git: 'https://github.com/dangrossman/bootstrap-daterangepicker',
 documentation: 'README.md'
 });

 Package.onUse(function(api) {
 api.versionsFrom('METEOR@0.9.0.1');

 api.use('twbs:bootstrap@3.3.4', ["client"]);
 api.use('momentjs:moment', ["client"]);
 api.use('jquery@1.11.3_2', ["client"]);

 api.addFiles('daterangepicker.js', ["client"]);
 api.addFiles('daterangepicker.css', ["client"]);
 });

 */
Package.describe({
    name: 'aofrozen:friends',
    version: '1.0.1',
    summary: 'Friends'
});

Package.onUse(function(api){
    api.versionsFrom('METEOR@1.2.1');
    api.addFiles(['friend.js', 'friend-methods.js', 'friend-publish.js'], ['server']);
    if(api.export)
    {
        api.export('deFriend');
    }
});