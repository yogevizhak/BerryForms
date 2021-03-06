/// <reference path="../base/baseController.ts" />
/// <reference path="../../interfaces/services/communication/IMessagingService.ts" />

//Controller responsible for showing confirmation dialog
module Controllers {
    'use strict';

    export class DialogController extends BaseController {
        //@ngInject
        constructor($scope:any,
                    private MessagingService:Services.IMessagingService) {
            super($scope);
            this.Initialize();
            this.RegisterListeners();
        }

        private Initialize():void {
            this.Scope.ResultDialog = this.ResultDialog.bind(this);
            this.Scope.Dialog = null;
        }

        private RegisterListeners():void {
            this.MessagingService.Messages.Dialog.Create.subscribe(this.CreateDialog.bind(this));
            this.MessagingService.Messages.Dialog.Remove.subscribe(this.RemoveDialog.bind(this));
        }

        private CreateDialog(dialogData:any):void {
            //dialogData = { Header, Text, Callback, Buttons: [{ Text, Value, ButtonType }] }
            this.RemoveDialog();
            this.Scope.Dialog = dialogData;
        }

        private ResultDialog(value:any):void {
            this.Scope.Dialog.Callback(value);
            this.Scope.Dialog = null;
        }

        private RemoveDialog():void {
            if (this.Scope.Dialog) {
                this.ResultDialog(null);
            }
        }
    }
}
