Package.describe({
    name: 'aofrozen:newusers',
    version: '1.0.0',
    summary: 'New Users'
});

Package.onUse(function(api){
    api.versionsFrom('METEOR@1.2.1');

    api.use("templating", "client");
    //api.addFiles(['server-timeline-lib.js', 'timeline-methods.js', 'timeline-publish.js'], ['server']);
    //api.addAssets(, ['client']);
    api.addFiles(['new-users.html', 'new-users.js'], ['client']);
});
