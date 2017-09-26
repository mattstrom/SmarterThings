"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var inversify_1 = require("inversify");
var inversify_express_utils_1 = require("inversify-express-utils");
var Oauth2 = require("simple-oauth2");
var types_1 = require("../di/types");
var OAuthController = (function () {
    function OAuthController(options) {
        this.endpointsUri = 'https://graph.api.smartthings.com/api/smartapps/endpoints';
        this.redirectUri = 'http://localhost:4567/oauth/callback';
        this.oauth = Oauth2.create(options);
    }
    OAuthController.prototype.index = function (request, response) {
        var authorizationUri = this.oauth.authorizationCode.authorizeURL({
            redirect_uri: this.redirectUri,
            scope: 'app',
            state: '3(#0/!~'
        });
        response.redirect(authorizationUri);
    };
    OAuthController.prototype.callback = function (request, response) {
        var code = request.query.code;
        this.oauth.authorizationCode.getToken({
            code: code,
            redirect_uri: this.redirectUri
        });
        function saveToken(error, result) {
            if (error) {
                console.log('Access Token Error', error.message);
            }
            // result.access_token is the token, get the endpoint
            var bearer = result.access_token;
            var url = this.endpointsUri + "?access_token=" + result.access_token;
            fetch(url, { method: 'GET' })
                .then(function (res) { return res.json(); })
                .then(function (body) {
                var endpoints = body;
                // we just show the final access URL and Bearer code
                var access_url = endpoints[0].url;
                var html = "\n\t\t\t\t\t\t<pre>https://graph.api.smartthings.com/" + access_url + "</pre>\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<pre>Bearer " + bearer + "</pre>\n\t\t\t\t\t";
                response.send(html);
            });
        }
    };
    __decorate([
        inversify_express_utils_1.httpGet('/'),
        __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], OAuthController.prototype, "index", null);
    __decorate([
        inversify_express_utils_1.httpGet('callback'),
        __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], OAuthController.prototype, "callback", null);
    OAuthController = __decorate([
        inversify_express_utils_1.controller('/oauth'),
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.OAuthModuleOptions)),
        __metadata("design:paramtypes", [Object])
    ], OAuthController);
    return OAuthController;
}());
exports.OAuthController = OAuthController;
//# sourceMappingURL=oauth.controller.js.map