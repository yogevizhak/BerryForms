/// <reference path="./directives/leftMenuAutosize.ts" />
/// <reference path="./directives/systemSymbolDirective.ts" />
/// <reference path="./directives/fieldComponentCreator.ts" />
/// <reference path="./directives/dashboardActivityItemChart.ts" />
/// <reference path="./components/fieldTypes/boolean/booleanFieldDirective.ts" />
/// <reference path="./components/fieldTypes/date/dateFieldDirective.ts" />
/// <reference path="./components/fieldTypes/list/listFieldDirective.ts" />
/// <reference path="./components/fieldTypes/select/selectFieldDirective.ts" />
/// <reference path="./components/fieldTypes/textarea/textareaFieldDirective.ts" />
/// <reference path="./components/fieldTypes/text/textFieldDirective.ts" />

/// <reference path="./controllers/global/menuController.ts" />
/// <reference path="./controllers/global/loadingController.ts" />
/// <reference path="./controllers/global/dialogController.ts" />
/// <reference path="./controllers/global/notificationController.ts" />
/// <reference path="./controllers/login/loginController.ts" />
/// <reference path="./controllers/combined/entityFormWithListController.ts" />
/// <reference path="./controllers/form/entityFormController.ts" />
/// <reference path="./controllers/form/entityMetadataFormController.ts" />
/// <reference path="./controllers/form/fieldMetadataFormController.ts" />
/// <reference path="./controllers/list/entityListController.ts" />
/// <reference path="./controllers/list/entityListWithFilterController.ts" />
/// <reference path="./controllers/list/fieldMetadataListController.ts" />
/// <reference path="./controllers/combined/dashboardController.ts" />
/// <reference path="./controllers/dashboard/dashboardActivitySummaryController.ts" />
/// <reference path="./controllers/dashboard/dashboardActivityListController.ts" />

/// <reference path="./interceptors/exceptionHandler.ts" />

/// <reference path="./services/communication/messagingService.ts" />
/// <reference path="./services/communication/queueService.ts" />
/// <reference path="./services/system/namingConventionsService.ts" />
/// <reference path="./services/mapping/entityModelMapperService.ts" />
/// <reference path="./services/mapping/filterConverterService.ts" />
/// <reference path="./services/system/redirectService.ts" />
/// <reference path="./services/localization/localizationService.ts" />
/// <reference path="./services/repository/httpWrapperService.ts" />
/// <reference path="./services/repository/entityRepositoryService.ts" />
/// <reference path="./services/repository/userRepositoryService.ts" />
/// <reference path="./services/repository/dashboardRepositoryService.ts" />
/// <reference path="./services/repository/urlLocatorService.ts" />
/// <reference path="./services/interaction/notificationService.ts" />
/// <reference path="./services/state/entityMetadataListCacheService.ts" />
/// <reference path="./services/state/entityListCacheService.ts" />
/// <reference path="./services/state/stateService.ts" />
/// <reference path="./services/interaction/dialogService.ts" />
/// <reference path="./services/interaction/domManipulationService.ts" />
/// <reference path="./services/repository/queryCreatorService.ts" />
/// <reference path="./services/plugins/pluginsExecutorService.ts" />
/// <reference path="./services/security/permissionService.ts" />

/// <reference path="./components/fieldTypes/fieldTypesRegistry.ts" />
/// <reference path="./components/fieldTypes/boolean/booleanFieldComponent.ts" />

/// <reference path="./router.ts" />
/// <reference path="./helpers/resourceLoader.ts" />

var _global:any = this;
_global.BootstrapScripts = _global.BootstrapScripts || [];
declare var angular:any;

//Application entry point. Load all required resources, then registers module and its dependencies
module AngularApplication {
    'use strict';

    class Bootstrap {
        public static Start():void {
            var app:any = angular.module('BerryFormsApp', ['ngRoute', 'ui.bootstrap.datepicker', 'ui.sortable', 'toaster']);
            //Routing & Configuration
            app.config(Config.Router.injection());

            //Interceptors
            app.factory('$exceptionHandler', Interceptors.ExceptionHandler.injection());

            //Directives
            app.directive('leftMenuAutosize', Directives.LeftMenuAutosize.injection());
            app.directive('systemSymbol', Directives.SystemSymbol.injection());
            app.directive('fieldComponentCreator', Directives.FieldComponentCreator.injection());
            app.directive('dashboardActivityItemChart', Directives.DashboardActivityItemChart.injection());

            //Services
            app.service('MessagingService', Services.MessagingService.injection());
            app.service('QueueService', Services.QueueService.injection());
            app.service('NamingConventionsService', Services.NamingConventionsService.injection());
            app.service('EntityModelMapperService', Services.EntityModelMapperService.injection());
            app.service('FilterConverterService', Services.FilterConverterService.injection());
            app.service('RedirectService', Services.RedirectService.injection());
            app.service('LocalizationService', Services.LocalizationService.injection());
            app.service('HttpWrapperService', Services.HttpWrapperService.injection());
            app.service('EntityRepositoryService', Services.EntityRepositoryService.injection());
            app.service('UserRepositoryService', Services.UserRepositoryService.injection());
            app.service('DashboardRepositoryService', Services.DashboardRepositoryService.injection());
            app.service('UrlLocatorService', Services.UrlLocatorService.injection());
            app.service('NotificationService', Services.NotificationService.injection());
            app.service('EntityMetadataListCacheService', Services.EntityMetadataListCacheService.injection());
            app.service('EntityListCacheService', Services.EntityListCacheService.injection());
            app.service('StateService', Services.StateService.injection());
            app.service('DialogService', Services.DialogService.injection());
            app.service('DomManipulationService', Services.DomManipulationService.injection());
            app.service('QueryCreatorService', Services.QueryCreatorService.injection());
            app.service('PluginsExecutorService', Services.PluginsExecutorService.injection());
            app.service('PermissionService', Services.PermissionService.injection());

            //Controllers
            app.controller('MenuController', Controllers.MenuController.injection());
            app.controller('LoginController', Controllers.LoginController.injection());
            app.controller('LoadingController', Controllers.LoadingController.injection());
            app.controller('DialogController', Controllers.DialogController.injection());
            app.controller('NotificationController', Controllers.NotificationController.injection());
            app.controller('EntityFormWithListController', Controllers.EntityFormWithListController.injection());
            app.controller('EntityFormController', Controllers.EntityFormController.injection());
            app.controller('EntityMetadataFormController', Controllers.EntityMetadataFormController.injection());
            app.controller('FieldMetadataFormController', Controllers.FieldMetadataFormController.injection());
            app.controller('EntityListController', Controllers.EntityListController.injection());
            app.controller('EntityListWithFilterController', Controllers.EntityListWithFilterController.injection());
            app.controller('FieldMetadataListController', Controllers.FieldMetadataListController.injection());
            app.controller('DashboardController', Controllers.DashboardController.injection());
            app.controller('DashboardActivitySummaryController', Controllers.DashboardActivitySummaryController.injection());
            app.controller('DashboardActivityListController', Controllers.DashboardActivityListController.injection());

            //Components
            app.service('FieldTypesRegistry', Components.FieldTypes.FieldTypesRegistry.injection());
            angular.forEach(_global.Components.FieldTypes, function (value:Components.FieldTypes.IFieldType):void {
                //Register each field type as directive
                app.directive(value.DirectiveName, value.DirectiveOptions());
            });

            //Additional bootstrap scripts
            for (var i:number = 0; i < _global.BootstrapScripts.length; i++) {
                var bootstrapScript:(ng:any) => void = _global.BootstrapScripts[i];
                bootstrapScript(angular);
            }

            //Manual bootstrap
            angular.bootstrap(document, ['BerryFormsApp']);
            document.body.className += ' ng-app';
        }
    }

    //Load resources and start
    (function ():void {
        Helpers.ResourceLoader.LoadRemainingResources(Bootstrap.Start);
    })();
}
