/// <reference path="../../jasmine.d.ts" />
/// <reference path="../../../client/angular/interfaces/services/state/IStateService.ts" />

module Mocks {
    'use strict';

    export class StateServiceMock implements Services.IStateService {
        constructor() {
            this.Setup();
        }

        private EditedEntity:Models.Entity;
        private DefaultUserSession:Models.UserSession;
        private UserSession:Models.UserSession;

        //Mock members
        public SetEditedEntity(entity:Models.Entity):void {
            this.EditedEntity = entity;
        }

        public GetEditedEntity(entityName:string, entityId:number):Models.Entity {
            return this.EditedEntity;
        }

        public RestoreDefaultUserSession():void {
            this.UserSession = this.DefaultUserSession;
        }

        public SetCurrentUserSession(userSession:Models.UserSession):void {
            this.UserSession = userSession;
        }

        public GetCurrentUserSession():Models.UserSession {
            return this.UserSession;
        }

        public UpdateCurrentUserSession(validTo:number, token:string):void {
            //Do nothing
        }

        public RegisterPostLoginAction(actionName:string, canCancel:boolean, action:() => void):void {
            //Do nothing
        }

        private Setup():void {
            var defaultSession:Models.UserSession = new Models.UserSession();
            defaultSession.ValidTo = 1234567890000;
            defaultSession.Token = 'abc-def-ghi';
            var defaultUser:Models.User = new Models.User();
            defaultUser.UserName = 'MockUser';
            defaultUser.IsSuperUser = true;
            defaultSession.User = defaultUser;
            this.DefaultUserSession = defaultSession;
            this.UserSession = defaultSession;

            spyOn(this, 'SetEditedEntity').and.callThrough();
            spyOn(this, 'GetEditedEntity').and.callThrough();
            spyOn(this, 'SetCurrentUserSession').and.callThrough();
            spyOn(this, 'GetCurrentUserSession').and.callThrough();
            spyOn(this, 'UpdateCurrentUserSession').and.callThrough();
            spyOn(this, 'RegisterPostLoginAction').and.callThrough();
        }
    }
}
