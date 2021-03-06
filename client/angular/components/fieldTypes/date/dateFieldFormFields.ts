/// <reference path="../boolean/booleanFieldMetadataModel.ts" />
/// <reference path="../date/dateFieldMetadataModel.ts" />
/// <reference path="../list/listFieldMetadataModel.ts" />
/// <reference path="../select/selectFieldMetadataModel.ts" />
/// <reference path="../textarea/textareaFieldMetadataModel.ts" />
/// <reference path="../text/textFieldMetadataModel.ts" />
/// <reference path="./../../../data/createFieldFormFields.ts" />
/// <reference path="../../../models/core/entityMetadataModel.ts" />
/// <reference path="../../../interfaces/localization/IResources.ts" />
/// <reference path="../../../services/localization/localizationService.ts" />
/// <reference path="../../../../config/config.ts" />

module Data {
    'use strict';

    export class CreateDateFieldFormFields {
        public static GetData():Models.EntityMetadata {
            var dateFields:Models.EntityMetadata = Data.CreateFieldFormFields.GetData(null);
            dateFields.Fields = dateFields.Fields.concat([
                CreateDateFieldFormFields.MinDateField(),
                CreateDateFieldFormFields.MaxDateField()
            ]);
            return dateFields;
        }

        private static MinDateField():Models.DateFieldMetadata {
            var result:Models.DateFieldMetadata = new Models.DateFieldMetadata();
            result.FieldSystemName = 'MinDate';
            result.FieldName = Services.LocalizationService.Resources.MinDate;
            result.FieldDescription = result.FieldName;
            return result;
        }

        private static MaxDateField():Models.DateFieldMetadata {
            var result:Models.DateFieldMetadata = new Models.DateFieldMetadata();
            result.FieldSystemName = 'MaxDate';
            result.FieldName = Services.LocalizationService.Resources.MaxDate;
            result.FieldDescription = result.FieldName;
            return result;
        }
    }
}
