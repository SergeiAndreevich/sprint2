"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorizationToken = exports.SALT_ROUNDS = void 0;
const authorization_middleware_1 = require("./middlewares/authorization.middleware");
exports.SALT_ROUNDS = 10;
const createAuthorizationToken = () => {
    const token = `${authorization_middleware_1.ADMIN_USERNAME}:${authorization_middleware_1.ADMIN_PASSWORD}`;
    const basedToken = Buffer.from(token).toString('base64');
    return `Basic ${basedToken}`;
};
exports.createAuthorizationToken = createAuthorizationToken;
