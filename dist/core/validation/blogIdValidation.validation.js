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
exports.blogIdValidation = void 0;
const express_validator_1 = require("express-validator");
const data_acsess_present_layer_1 = require("../repository/data-acsess-present-layer");
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
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    // value - это значение blogId, которое нужно проверить
    //console.log(value)
    yield data_acsess_present_layer_1.queryRepo.findBlogByIdOrFail(value);
    return;
}))
    .withMessage('Blog with this id does not exist');
