import {Router} from "express";
import {createPostHandler} from "../Posts/handlers/createPost.handler";
import {findAllPostsHandler} from "../Posts/handlers/findAllPosts.handler";
import {findPostByIdHandler} from "../Posts/handlers/findPostById.handler";
import {updatePostByIdHandler} from "../Posts/handlers/updatePostById.handler";
import {removePostByIdHandler} from "../Posts/handlers/removePostById.handler";
import {idValidation} from "../core/validation/checkId.validation";
import {postInputModelValidation} from "../core/validation/InputPost.validation";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {authorizeMiddleware} from "../authorization/authorization.middleware";
export const postsRouter = Router({});

postsRouter
    .get('', findAllPostsHandler)
    .post('', authorizeMiddleware, postInputModelValidation, checkValidationErrors, createPostHandler)
    .get('/:id', idValidation, checkValidationErrors, findPostByIdHandler)
    .put('/:id',authorizeMiddleware, idValidation, postInputModelValidation, checkValidationErrors, updatePostByIdHandler)
    .delete('/:id',authorizeMiddleware, idValidation, checkValidationErrors, removePostByIdHandler)
