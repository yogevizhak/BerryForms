/// <reference path="../../interfaces/services/interaction/IDialogService.ts" />
/// <reference path="../../interfaces/services/localization/ILocalizationService.ts" />
/// <reference path="../../interfaces/services/communication/IMessagingService.ts" />

'use strict';

//Service responsible for creating dialogs
module Services {
    export class DialogService implements Services.IDialogService {
        public static injection():any[] {
            return [
                'LocalizationService',
                'MessagingService',
                DialogService
            ];
        }

        constructor(private LocalizationService:Services.ILocalizationService,
                    private MessagingService:Services.IMessagingService) {
        }

        public CreateConfirmationDialog(confirmationText:string, callback:(result:boolean)=>void):void {
            var dialogData = {
                Header: this.LocalizationService.Resources.Confirmation,
                Text: confirmationText,
                Callback: callback,
                Buttons: [
                    { Text: this.LocalizationService.Resources.Yes, Value: true, ButtonType: 'warning' },
                    { Text: this.LocalizationService.Resources.No, Value: false, ButtonType: 'default' }
                ]
            };

            this.MessagingService.Messages.Dialog.Create.publish(dialogData);
        }
    }
}
