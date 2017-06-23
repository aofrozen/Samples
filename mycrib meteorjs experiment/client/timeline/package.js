Package.describe({
    name: 'aofrozen:timeline',
    version: '1.0.2',
    summary: 'Timeline'
});

Package.onUse(function(api){
    api.versionsFrom('METEOR@1.2.1');

    api.use("templating", "client");
    api.addFiles(['server-timeline-lib.js', 'timeline-methods.js', 'timeline-publish.js'], ['server']);
    //api.addAssets(, ['client']);
    api.addFiles(['re-timeline.html', 're-timeline.js'], ['client']);
    if(api.export)
    {
        api.export('deTimelineServer'); //server
    }
});
