/// <reference path="../model/ErrorsModel.ts" />
/// <reference path="../model/ClientErrorModel.ts" />

'use strict';

import Base = require('../model/ErrorsModel');
import ClientErrorModelModule = require('../model/ClientErrorModel');

export module Model {
    export class ClientErrorsModel extends Base.Model.ErrorsModel<ClientErrorModelModule.Model.ClientErrorModel> {
        constructor() {
            super();
            this.Type = 'Client';
        }

        public static CreateWithError(key:string, parameters:string[]):Model.ClientErrorsModel {
            var result:Model.ClientErrorsModel = new Model.ClientErrorsModel();
            var error = new ClientErrorModelModule.Model.ClientErrorModel(key, parameters);
            result.Errors = [error];
            return result;
        }
    }
}