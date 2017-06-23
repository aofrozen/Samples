Router.configure({
    layoutTemplate: 'main'
});

Router.map(function(){
    this.route('trade', {
        path: '/',
        template: 'trade'
    });

    this.route('analyze', {
        path: '/analyze',
        template: 'analyze'
    });
    this.route('transactions', {
        path: '/transactions',
        template: 'transactions'
    });
    this.route('game', {
        path: '/game',
        template: 'game'
    });
    this.route('alarm', {
        path: '/alarm',
        template: 'alarm'
    });
    this.route('chart', {
        path: '/chart',
        template: 'chart'
    })
});