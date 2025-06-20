import {body} from "express-validator";

const loginOrEmail = body()

const password = body('password')
    .exists()
    .isString()
    .trim()
    .withMessage('Password must be a string')
    .isLength({ min: 1 })
    .withMessage('Password must be greater than 1 symbol')

export const AuthInputValidation = [loginOrEmail, password];