import {param} from "express-validator";

export const idValidation = param('id')
    .exists()
    .withMessage('Id is required')
    // .isNumeric()
    // .withMessage('It must be a numeric string')
    .isString()
    .withMessage('Id must be string')
    .isMongoId()
    .withMessage('Id must be MongoId')
    .isLength({min: 1})
    .withMessage('Id must consist of length more than or equal to 1')
    //как проверить, что такое есть в БД?
