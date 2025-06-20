import {body} from "express-validator";

export const BlogPostInputModelValidation = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({min:1, max:30})
        .withMessage('Title must be less 30'),
    body('shortDescription')
        .isString()
        .withMessage('shortDescription must be a string')
        .trim()
        .isLength({min:1, max:30})
        .withMessage('shortDescription must be less 100'),
    body('content')
        .isString()
        .withMessage('shortDescription must be a string')
        .trim()
        .isLength({min:1, max:1000})
        .withMessage('shortDescription must be less 1000')
]
