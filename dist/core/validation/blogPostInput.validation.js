"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostInputModelValidation = void 0;
const express_validator_1 = require("express-validator");
exports.BlogPostInputModelValidation = [
    (0, express_validator_1.body)('title')
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Title must be less 30'),
    (0, express_validator_1.body)('shortDescription')
        .isString()
        .withMessage('shortDescription must be a string')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('shortDescription must be less 100'),
    (0, express_validator_1.body)('content')
        .isString()
        .withMessage('shortDescription must be a string')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('shortDescription must be less 1000')
];
