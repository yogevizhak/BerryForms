// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            //Dependencies
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-ui-bootstrap/src/position/position.js',
            'bower_components/angular-ui-bootstrap/src/dateparser/dateparser.js',
            'bower_components/angular-ui-bootstrap/src/datepicker/datepicker.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/ng-sortable/dist/ng-sortable.js',
            'bower_components/angularjs-toaster/toaster.js',

            //Files that needs to be registered in explicit order
            'client/extensions/*.js',
            'client/static/*.js',
            'client/config/*.js',
            'client/angular/components/fieldTypes/fieldTypesRegistry.js',
            'client/angular/components/plugins/pluginsRegistry.js',
            'client/angular/models/core/fieldMetadataModel.js',
            'client/angular/directives/fieldDirectiveBase.js',
            'client/angular/controllers/base/baseController.js',
            'client/angular/controllers/base/baseViewController.js',
            'client/angular/controllers/base/baseListController.js',
            'client/angular/services/mapping/objectMapperBaseService.js',
            'client/angular/services/communication/messagingBaseService.js',
            'client/angular/services/communication/queueBaseService.js',

            //All other files
            'client/**/*.js',
            'test/unit/**/*.js',

            //Serve js.maps and source ts files
            {pattern: 'client/**/*.js.map', watched: false, included: false, served: true},
            {pattern: 'client/**/*.ts', watched: false, included: false, served: true},
            {pattern: 'test/**/*.js.map', watched: false, included: false, served: true},
            {pattern: 'test/**/*.ts', watched: false, included: false, served: true}
        ],

        // list of files / patterns to exclude
        exclude: [
            //Load just english resources
            'client/angular/localization/localizationLoader.js',
            'client/angular/localization/*[!en]/*.js',

            //Do not load configuration overrides
            'client/config/configLoader.js',

            //Do not setup app
            'client/angular/app.js'
        ],

        // web server port
        port: 8082,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
