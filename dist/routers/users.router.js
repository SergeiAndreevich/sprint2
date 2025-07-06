"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const ValidationErrors_1 = require("../core/validation/ValidationErrors");
const authorization_middleware_1 = require("../authorization/middlewares/authorization.middleware");
const userInputValidation_validation_1 = require("../core/validation/userInputValidation.validation");
const createUserHandler_handler_1 = require("../Users/handers/createUserHandler.handler");
const checkId_validation_1 = require("../core/validation/checkId.validation");
const removeUserHandler_handler_1 = require("../Users/handers/removeUserHandler.handler");
const findAllUsersList_handler_1 = require("../Users/handers/findAllUsersList.handler");
const queryValidation_validation_1 = require("../core/validation/queryValidation.validation");
const pagination_and_sorting_1 = require("../core/core-types/pagination-and-sorting");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter
    .get('/', authorization_middleware_1.authorizeMiddleware, (0, queryValidation_validation_1.paginationAndSortingValidation)(pagination_and_sorting_1.UsersSortFields), ValidationErrors_1.checkValidationErrors, findAllUsersList_handler_1.findAllUsers)
    .post('/', authorization_middleware_1.authorizeMiddleware, userInputValidation_validation_1.UserInputValidation, ValidationErrors_1.checkValidationErrors, createUserHandler_handler_1.createUserHandler)
    .delete('/:id', authorization_middleware_1.authorizeMiddleware, checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, removeUserHandler_handler_1.removeUserHandler);
