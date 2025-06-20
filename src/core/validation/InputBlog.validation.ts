import {body} from "express-validator";

// export const validateBlogInputModel =(post: BlogInputModel):ValidationError[]=>{
//     const errors: ValidationError[] = [];
//
//     return errors
// }

const nameValidation = body('name')
    .isString()
    .withMessage('name should be string')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('Length must be less than 15 characters');
const descriptionValidation = body('description')
    .isString()
    .withMessage('description should be string')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Length of description must be less then 500');
const websiteUrlValidation = body('websiteUrl')
    .isString()
    .withMessage('websiteUrl should be string')
    .trim()
    .isLength({ min: 11, max: 100 })
    .withMessage('Length of url must be >10 and <100')
    .isURL()
    .withMessage('It should be url');
// ОБРАТИ ВНИМАНИЕ СЮДА, ЕСЛИ НЕ БУДЕТ РАБОТАТЬ https://a.r - это 11 символов. Вот откуда цифра (10 сли http)

export const blogInputModelValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
]