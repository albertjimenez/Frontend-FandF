"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var login_service_1 = require("./login.service");
var forms_1 = require("@angular/forms");
var header_service_1 = require("../header.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var MIN_CHARS = 0;
        this.loginFormControl = new forms_1.FormGroup({
            username: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(MIN_CHARS)]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(MIN_CHARS)]),
        });
    };
    LoginComponent.prototype.onLoginAccess = function () {
        var username = this.loginFormControl.value.username;
        var password = this.loginFormControl.value.password;
        console.log('Username: ', username, 'Password:', password);
        this.loginService.postLoginCredentials(username, password).subscribe(function (data) {
            console.log('Successful ', data);
        }, function (error) { return console.log('Error ->', error); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [login_service_1.LoginService, header_service_1.HeaderService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
