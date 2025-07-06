import {Router} from "express";
import {idValidation} from "../core/validation/checkId.validation";
import {checkValidationErrors} from "../core/validation/ValidationErrors";

export const commentsRouter = Router({})
// commentsRouter
//     .get('/:commentId',idValidation,checkValidationErrors,findCommentById)
//     .put('/:commentId',idValidation,checkValidationErrors,changeCommentById)
//     .delete('/:commentId',idValidation,checkValidationErrors,removeCommentById)
