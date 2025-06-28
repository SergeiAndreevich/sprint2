"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdValidation = void 0;
const express_validator_1 = require("express-validator");
exports.blogIdValidation = (0, express_validator_1.param)('blogId')
    .exists()
    .withMessage('Id is required')
    .isString()
    .withMessage('Id must be string')
    .isMongoId()
    .withMessage('Id must be MongoId')
    .isLength({ min: 1 })
    .withMessage('Id must consist of length more than or equal to 1')
    //как проверить, что такое есть в БД?
    //     .custom(async (value) => {
    //         // value - это значение blogId, которое нужно проверить
    //         //console.log(value)
    //         await queryRepo.findBlogByIdOrFail(value);
    //         return
    //     })
    .withMessage('Blog with this id does not exist');
