"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInputValidation = void 0;
const express_validator_1 = require("express-validator");
const loginOrEmail = (0, express_validator_1.body)();
const password = (0, express_validator_1.body)('password')
    .exists()
    .isString()
    .trim()
    .withMessage('Password must be a string')
    .isLength({ min: 1 })
    .withMessage('Password must be greater than 1 symbol');
exports.AuthInputValidation = [loginOrEmail, password];
