/// <reference path="../../../directives/fieldDirectiveBase.ts" />

module Directives {
    'use strict';

    export class BooleanField extends Directives.BaseField {
        public static injection():any[] {
            return [
                BooleanField.DirectiveOptions
            ];
        }

        public static DirectiveOptions():any {
            return BaseField.DirectiveOptions('Boolean', BooleanField.StaticConstructor);
        }

        public static StaticConstructor():Directives.BooleanField {
            return new Directives.BooleanField();
        }
    }
}
