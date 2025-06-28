"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInputValidation = void 0;
const express_validator_1 = require("express-validator");
//
// const loginOrEmail = body('loginOrEmail')
//         .exists().withMessage('loginOrEmail is required').trim()
//         .custom(async (value, { req }) => {
//             if (value.isEmail()) {
//                 // Логика для email
//                 if (!value.isLength({ min: 6})) {
//                     throw new Error('Email must be gt 6 characters');
//                 }
//                 // Дополнительные проверки для email, если нужно
//                 if (!value.isEmail()) {
//                     throw new Error("Invalid Email format")
//                 }
//             } else {
//                 // Логика для логина
//                 if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
//                     throw new Error('Login must contain only letters, numbers, underscores, and hyphens');
//                 }
//                 if (!value.isLength({ min: 1})) {
//                     throw new Error('Login must be gt 1 characters');
//                 }
//             }
//         })
const loginOrEmail = (0, express_validator_1.body)('loginOrEmail')
    .exists().withMessage('loginOrEmail is required').trim()
    .isString().withMessage('loginOrEmail must be string');
const password = (0, express_validator_1.body)('password')
    .exists().withMessage('password is required')
    .isString()
    .trim()
    .withMessage('Password must be a string')
    .isLength({ min: 1 })
    .withMessage('Password must be greater than 1 symbol');
exports.AuthInputValidation = [loginOrEmail, password];
