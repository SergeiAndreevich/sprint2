"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authInputValidation_validation_1 = require("../core/validation/authInputValidation.validation");
const ValidationErrors_1 = require("../core/validation/ValidationErrors");
const authBearer_handler_1 = require("../authorization/authBearer.handler");
const bearerMiddleware_middleware_1 = require("../authorization/middlewares/bearerMiddleware.middleware");
const whoAmIHandler_handler_1 = require("../authorization/whoAmIHandler.handler");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter
    .post('/login', authInputValidation_validation_1.AuthInputValidation, ValidationErrors_1.checkValidationErrors, authBearer_handler_1.authHandler)
    // проверили, корректно ли нам передали инпут
    //собрали огибки валидации и кинули их в мидлвэре
    // обработали в хэндлере - есть ошибки валидации 400, не совпали данные - 401, все ок 200
    .get('/me', bearerMiddleware_middleware_1.tokenGuard, whoAmIHandler_handler_1.whoAmI);
