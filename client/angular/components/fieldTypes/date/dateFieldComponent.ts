/// <reference path="../../../../extensions/dateExtensions.ts" />
/// <reference path="../../../interfaces/components/fieldTypes/IFieldType.ts" />
/// <reference path="../../../data/createFieldFormFields.ts" />
/// <reference path="./dateFieldDirective.ts" />
/// <reference path="./dateFieldFormFields.ts" />
/// <reference path="./dateFieldFilter.ts" />

'use strict';

module Components.FieldTypes {
    export class DateFieldComponent implements IFieldType {
        //Identifier
        public FieldName:string = 'Date';

        //Directive registration
        public DirectiveName:string = 'fieldDate';

        public DirectiveOptions():any[] {
            return Directives.DateField.injection();
        }

        //Metadata model
        public CreateMetadata():Models.FieldMetadata {
            return new Models.DateFieldMetadata();
        }

        //Format value
        public FormatValue(value:any):string {
            if (!value) {
                return null;
            }
            var date:Date = new Date(value);
            return date.format(Config.Client.DatepickerFormat);
        }

        //Field filtering
        public CreateFilterFields(fieldMetadata:Models.FieldMetadata):Models.FieldMetadata[] {
            return Components.FieldTypes.DateFieldFilter.CreateFilterFields(fieldMetadata);
        }

        public CreateFilterQuery(fieldMetadata:Models.FieldMetadata, filterValues:any[]):any {
            return Components.FieldTypes.DateFieldFilter.CreateFilterQuery(fieldMetadata, filterValues);
        }

        public ParseFilterQueryString(fieldMetadata:Models.FieldMetadata, filterEntity:Models.Entity, routeParams:any):void {
            return Components.FieldTypes.DateFieldFilter.ParseFilterQueryString(fieldMetadata, filterEntity, routeParams);
        }

        public CreateFilterQueryString(fieldMetadata:Models.FieldMetadata, filterValues:any[]):string[] {
            return Components.FieldTypes.DateFieldFilter.CreateFilterQueryString(fieldMetadata, filterValues);
        }

        //Field creation form
        public CreateFieldForm():Models.EntityMetadata {
            return Data.CreateDateFieldFormFields.GetData();
        }
    }
}

_global.Components.FieldTypes.push(new Components.FieldTypes.DateFieldComponent());
