/// <reference path="../../extensions/stringExtensions.ts" />
/// <reference path="../../config/config.ts" />
/// <reference path="../interfaces/directives/IDirective.ts" />

'use strict';
declare var angular:any;

//Directive that creates special types of UI symbols (icons, color boxes)
module Directives {
    export class SystemSymbol implements Directives.IDirective {
        public static injection():any[] {
            return [
                SystemSymbol.DirectiveOptions
            ];
        }

        public static DirectiveOptions():any {
            return {
                restrict: 'A',
                scope: '=',
                replace: true,
                templateUrl: 'angular/views/systemSymbol.html',
                link: function ($scope, $linkElement, $linkAttributes) {
                    var instance:Directives.IDirective = new SystemSymbol();
                    instance.Link($scope, $linkElement, $linkAttributes);
                }
            };
        }

        public Scope:any;

        public Link($scope:any, $linkElement:any, $linkAttributes:any):void {
            var argument:string = $linkAttributes.systemSymbol;
            this.Scope = $scope;
            this.Scope.SymbolModel = this.CreateSymbolModel(argument);

            //Watch for change
            var _this = this;
            $linkAttributes.$observe('systemSymbol', function (newArgument:string) {
                if (newArgument) _this.Scope.SymbolModel = _this.CreateSymbolModel(newArgument);
            });
        }

        private Types:any[] = [
            { Name: 'Icon', SystemName: Config.Client.SystemIconIdentifier },
            { Name: 'Color', SystemName: Config.Client.SystemColorIdentifier }
        ];

        private CreateSymbolModel(argument:string):any {
            var type:string = null;
            var name:string = null;
            var bound:boolean = false;

            angular.forEach(this.Types, function (systemSymbolType:any) {
                if (!bound && argument && argument.startsWith(systemSymbolType.SystemName)) {
                    type = systemSymbolType.Name;
                    name = argument.substr(systemSymbolType.SystemName.length);
                    bound = true;
                }
            });

            return {
                Type: type,
                Name: name
            };
        }
    }
}
