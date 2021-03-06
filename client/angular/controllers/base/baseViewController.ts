/// <reference path="../base/baseController.ts" />
/// <reference path="../../interfaces/services/communication/IMessagingService.ts" />
/// <reference path="../../interfaces/services/communication/IQueueService.ts" />
/// <reference path="../../interfaces/services/state/IStateService.ts" />
/// <reference path="../../interfaces/services/interaction/INotificationService.ts" />
/// <reference path="../../../static/controllerArea.ts" />

//Base controllers for main views (views loaded with ng-view according to route)
module Controllers {
    'use strict';

    export class BaseViewController extends BaseController {
        constructor(Scope:any,
                    public ControllerArea:Static.ControllerArea,
                    public MessagingService:Services.IMessagingService,
                    public NotificationService:Services.INotificationService,
                    public QueueService:Services.IQueueService,
                    public StateService:Services.IStateService) {
            super(Scope);
            this.SetupBaseViewController();
        }

        public Configuration:any;

        private SetupBaseViewController():void {
            this.DeleteInvalidState();
            this.RemovePendingDialog();
            this.NotifyAllWaitingMessages();
            this.SetConfiguration();
        }

        private DeleteInvalidState():void {
            if (this.ControllerArea !== Static.ControllerArea.Entity) {
                this.StateService.SetEditedEntity(null);
            }
        }

        private RemovePendingDialog():void {
            this.MessagingService.Messages.Dialog.Remove.publish();
        }

        private NotifyAllWaitingMessages():void {
            var allMessages:any[] = this.QueueService.Queues.NextPage.Notifications.retrieveAll();
            if (!allMessages || allMessages.length === 0) {
                return;
            }

            for (var i:number = 0; i < allMessages.length; i++) {
                var messageObject:any = allMessages[i];
                this.NotificationService.NotifyMessage(messageObject.Message, messageObject.Severity);
            }
        }

        private SetConfiguration():void {
            this.Configuration = {
                List: {
                    MoveEnabled: this.ControllerArea === Static.ControllerArea.Metadata,
                    EditEnabled: true,
                    DeleteEnabled: true
                }
            };
        }
    }
}
