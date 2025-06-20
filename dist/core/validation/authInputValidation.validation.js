"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInputValidation = void 0;
const express_validator_1 = require("express-validator");
const loginOrEmail = (0, express_validator_1.body)('loginOrEmail')
    .exists().withMessage('loginOrEmail is required').trim()
    .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
    if (value.isEmail()) {
        // Логика для email
        if (!value.isLength({ min: 6 })) {
            throw new Error('Email must be gt 6 characters');
        }
        // Дополнительные проверки для email, если нужно
        if (!value.isEmail()) {
            throw new Error("Invalid Email format");
        }
    }
    else {
        // Логика для логина
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
            throw new Error('Login must contain only letters, numbers, underscores, and hyphens');
        }
        if (!value.isLength({ min: 1 })) {
            throw new Error('Login must be gt 1 characters');
        }
    }
}));
const password = (0, express_validator_1.body)('password')
    .exists().withMessage('password is required')
    .isString()
    .trim()
    .withMessage('Password must be a string')
    .isLength({ min: 1 })
    .withMessage('Password must be greater than 1 symbol');
exports.AuthInputValidation = [loginOrEmail, password];
