"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminAuthorizeMiddleware = exports.SUPERADMIN_PASSWORD = exports.SUPERADMIN_EMAIL = exports.SUPERADMIN_LOGIN = void 0;
exports.SUPERADMIN_LOGIN = process.env.SUPERADMIN_LOGIN || 'superadmin';
exports.SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'superadmin@mail.ru';
exports.SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD || '1234';
const superAdminAuthorizeMiddleware = (req, res, next) => {
    next();
};
exports.superAdminAuthorizeMiddleware = superAdminAuthorizeMiddleware;
