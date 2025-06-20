import {Router} from "express";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {superAdminAuthorizeMiddleware} from "../authorization/superAdminAuthorization.middleware";
import {authorizeMiddleware} from "../authorization/authorization.middleware";
import {UserInputValidation} from "../core/validation/userInputValidation.validation";
import {createUserHandler} from "../Users/handers/createUserHandler.handler";
import {idValidation} from "../core/validation/checkId.validation";
import {removeUserHandler} from "../Users/handers/removeUserHandler.handler";

export const usersRouter = Router({});

usersRouter
//    .get('/', superAdminAuthorizeMiddleware, findAllUsersHandler)
    .post('/', authorizeMiddleware, UserInputValidation, checkValidationErrors, createUserHandler)
    .delete('/:id', authorizeMiddleware, idValidation, checkValidationErrors, removeUserHandler)
