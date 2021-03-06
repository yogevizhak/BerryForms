/// <reference path="../../jasmine.d.ts" />
/// <reference path="../page-objects/form.ts" />

module PageObjects {
    'use strict';

    export class LoginDialog {
        constructor() {
            this.DialogSelector = '.dialog.login';
            this.DialogScopeName = 'LoginDialog';
        }

        private DialogSelector:string;
        private DialogScopeName:string;

        public static Current():PageObjects.LoginDialog {
            return new PageObjects.LoginDialog();
        }

        public LoginAs(userName:string, password:string, keepLoggedIn:boolean):void {
            var loginForm:PageObjects.Form = PageObjects.Form.In(this.DialogSelector);
            loginForm.FillAndSubmit([
                {Name: 'UserName', Type: 'text', Value: userName},
                {Name: 'Password', Type: 'text', Value: password},
                {Name: 'StayLoggedIn', Type: 'boolean', Value: keepLoggedIn ? 'Yes' : 'No'}
            ]);
        }

        public LoginAsDefault(keepLoggedIn:boolean):void {
            this.LoginAs('admin', 'admin', keepLoggedIn);
        }

        public VisibleDialogsCount():any {
            return element(this.DialogSelector + ':visible').count();
        }

        public EnabledSubmitButtonsCount():any {
            return element(this.DialogSelector + '.btn-default:not(:disabled)').count();
        }
    }
}
