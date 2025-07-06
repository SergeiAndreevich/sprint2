import {Router} from "express";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {authorizeMiddleware} from "../authorization/middlewares/authorization.middleware";
import {UserInputValidation} from "../core/validation/userInputValidation.validation";
import {createUserHandler} from "../Users/handers/createUserHandler.handler";
import {idValidation} from "../core/validation/checkId.validation";
import {removeUserHandler} from "../Users/handers/removeUserHandler.handler";
import {findAllUsers} from "../Users/handers/findAllUsersList.handler";
import {paginationAndSortingValidation} from "../core/validation/queryValidation.validation";
import {UsersSortFields} from "../core/core-types/pagination-and-sorting";

export const usersRouter = Router({});

usersRouter
    .get('/', authorizeMiddleware, paginationAndSortingValidation(UsersSortFields), checkValidationErrors, findAllUsers)
    .post('/', authorizeMiddleware, UserInputValidation, checkValidationErrors, createUserHandler)
    .delete('/:id', authorizeMiddleware, idValidation, checkValidationErrors, removeUserHandler)
