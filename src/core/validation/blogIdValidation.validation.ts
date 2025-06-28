import {param} from "express-validator";
import {queryRepo} from "../repository/data-acsess-present-layer";

export const blogIdValidation = param('blogId')
    .exists()
    .withMessage('Id is required')
    .isString()
    .withMessage('Id must be string')
    .isMongoId()
    .withMessage('Id must be MongoId')
    .isLength({min: 1})
    .withMessage('Id must consist of length more than or equal to 1')
//как проверить, что такое есть в БД?
//     .custom(async (value) => {
//         // value - это значение blogId, которое нужно проверить
//         //console.log(value)
//         await queryRepo.findBlogByIdOrFail(value);
//         return
//     })
    .withMessage('Blog with this id does not exist')
