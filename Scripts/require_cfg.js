var require = {
    baseUrl: '/Scripts',
    paths: {
        jquery: [
             'jquery-2.1.3.min'
        ],
        knockout: [
           
            'knockout-3.3.0'
        ],
        lodash: 'lodash.min',
        //'jquery.signalR': 'jquery.signalR-2.1.1.min',
        //'signalR.proxy': '/signalr/hubs?',
        //ravenjs: '//cdn.ravenjs.com/1.1.10/jquery,native/raven.min',
        'jquery.bootstrap': 'bootstrap.min',
        'knockout.projections': 'knockout-projections',
        'knockout.mapping': 'knockout.mapping-latest'
    },
    shim: {
            //'jquery.signalR': { deps: ['jquery'] },
            //'signalR.proxy': {
            //    deps: ['jquery.signalR'],
            //    exports: '$.connection'
            //},
            //ravenjs: {
            //    deps: ['jquery'],
            //    exports: 'Raven',
            //    init: function() {
            //        this.Raven.config('').install();
            //    }
            //},
            'jquery.bootstrap': { deps: ['jquery'] }
    }
    //deps: ['ravenjs' /*, 'jquery.bootstrap'*/] //auto-load on page startup
};