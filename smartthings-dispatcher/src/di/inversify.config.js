"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var types_1 = require("./types");
var container = new inversify_1.Container();
container.bind(types_1.default.TokenHost).toConstantValue('https://graph.api.smartthings.com');
container.bind(types_1.default.OAuthModuleOptions).toDynamicValue(function (context) {
    return {
        client: {
            id: context.container.get(types_1.default.ClientId),
            secret: context.container.get(types_1.default.ClientSecret)
        },
        auth: {
            tokenHost: context.container.get(types_1.default.TokenHost)
        }
    };
});
exports.default = container;
//# sourceMappingURL=inversify.config.js.map