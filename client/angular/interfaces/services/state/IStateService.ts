/// <reference path="../../../models/core/entityModel.ts" />

'use strict';

//Interface for State service (stores state that needs to be preserved between page switches)
module Services {
    export interface IStateService {
        //Entity being created/edited
        SetEditedEntity(entity:Models.Entity):void;
        GetEditedEntity(entityName:string, entityId:number):Models.Entity;

        //Current logged in user
        SetCurrentUserSession(userSession:Models.UserSession):void;
        GetCurrentUserSession():Models.UserSession;
        UpdateCurrentUserSession(validTo:number, token:string):void;
        RegisterPostLoginAction(actionName:string, canCancel:boolean, action:()=>void):void;
    }
}
