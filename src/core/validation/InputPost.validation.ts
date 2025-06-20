import {body} from "express-validator";
import {queryRepo} from "../repository/data-acsess-present-layer";

const titleValidation = body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Title length must be >1 and <30");

const shortDescriptionValidation =  body("shortDescription")
    .exists()
    .withMessage("ShortDescription is required")
    .isString()
    .withMessage("ShortDescription must be a string")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("ShortDescription must be >1 and <100");

const contentValidation = body("content")
    .exists()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content must be >1 and <1000");

const blogIdValidation = body("blogId")
    .exists()
    .withMessage('blogId is required')
    .isString()    // Проверяем, что это строка
    .withMessage("BlogId must be a string")
    // .isNumeric()    // Проверяем, что это numericString
    // .withMessage("BlogId must be a numeric string")
    .isMongoId()
    .withMessage("BlogId must be a string")
    .trim()
    .isLength({min: 1})
    .withMessage('blogId must consist of length more than or equal to 1')
    //как проверить, что такое есть в БД?
    .custom(async (value) => {
        // value - это значение blogId, которое нужно проверить
        await queryRepo.findBlogByIdOrFail(value);
        return
    })
    .withMessage('Blog with this id does not exist')

export const postInputModelValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]