"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = void 0;
const express_validator_1 = require("express-validator");
exports.idValidation = (0, express_validator_1.param)('id')
    .exists()
    .withMessage('Id is required')
    // .isNumeric()
    // .withMessage('It must be a numeric string')
    .isString()
    .withMessage('Id must be string')
    .isMongoId()
    .withMessage('Id must be MongoId')
    .isLength({ min: 1 })
    .withMessage('Id must consist of length more than or equal to 1');
//как проверить, что такое есть в БД?
