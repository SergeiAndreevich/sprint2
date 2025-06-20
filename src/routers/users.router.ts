import {Router} from "express";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {superAdminAuthorizeMiddleware} from "../authorization/superAdminAuthorization.middleware";

export const usersRouter = Router({});
//
// usersRouter
//     .get('/', superAdminAuthorizeMiddleware, findAllUsersHandler)
//     .post('/', superAdminAuthorizeMiddleware, UserInputValidation, checkValidationErrors, createUserHandler)
//     .delete('/:id', superAdminAuthorizeMiddleware, checkUserIdQuery, checkValidationErrors, removeUserHandler)
// git