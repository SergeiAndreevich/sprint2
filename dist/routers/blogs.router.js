"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const createBlog_handler_1 = require("../Blogs/handlers/createBlog.handler");
const findAllBlogsHandler_1 = require("../Blogs/handlers/findAllBlogsHandler");
const findBlogByIdHandler_1 = require("../Blogs/handlers/findBlogByIdHandler");
const removeBlogByIdHandler_1 = require("../Blogs/handlers/removeBlogByIdHandler");
const updateBlogByIdHandler_1 = require("../Blogs/handlers/updateBlogByIdHandler");
const checkId_validation_1 = require("../core/validation/checkId.validation");
const InputBlog_validation_1 = require("../core/validation/InputBlog.validation");
const ValidationErrors_1 = require("../core/validation/ValidationErrors");
const authorization_middleware_1 = require("../authorization/authorization.middleware");
const queryValidation_validation_1 = require("../core/validation/queryValidation.validation");
const pagination_and_sorting_1 = require("../core/core-types/pagination-and-sorting");
const blogIdValidation_validation_1 = require("../core/validation/blogIdValidation.validation");
const findPostsForSpecificBlogHandler_handler_1 = require("../Blogs/handlers/findPostsForSpecificBlogHandler.handler");
const createPostForSpecificBlogHandler_handler_1 = require("../Posts/handlers/createPostForSpecificBlogHandler.handler");
const blogPostInput_validation_1 = require("../core/validation/blogPostInput.validation");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter
    .get('', (0, queryValidation_validation_1.paginationAndSortingValidation)(pagination_and_sorting_1.BlogSortsFields), ValidationErrors_1.checkValidationErrors, findAllBlogsHandler_1.findAllBlogsHandler)
    .get('/:id', checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, findBlogByIdHandler_1.findBlogByIdHandler)
    .get('/:blogId/posts', blogIdValidation_validation_1.blogIdValidation, (0, queryValidation_validation_1.paginationAndSortingValidation)(pagination_and_sorting_1.PostsSortFields), ValidationErrors_1.checkValidationErrors, findPostsForSpecificBlogHandler_handler_1.findPostsForSpecificBlogHandler)
    .post('', authorization_middleware_1.authorizeMiddleware, InputBlog_validation_1.blogInputModelValidation, ValidationErrors_1.checkValidationErrors, createBlog_handler_1.createBlogHandler)
    .post('/:blogId/posts', blogIdValidation_validation_1.blogIdValidation, authorization_middleware_1.authorizeMiddleware, blogPostInput_validation_1.BlogPostInputModelValidation, ValidationErrors_1.checkValidationErrors, createPostForSpecificBlogHandler_handler_1.createPostForSpecificBlogHandler)
    .put('/:id', authorization_middleware_1.authorizeMiddleware, checkId_validation_1.idValidation, InputBlog_validation_1.blogInputModelValidation, ValidationErrors_1.checkValidationErrors, updateBlogByIdHandler_1.updateBlogByIdHandler)
    .delete('/:id', authorization_middleware_1.authorizeMiddleware, checkId_validation_1.idValidation, ValidationErrors_1.checkValidationErrors, removeBlogByIdHandler_1.removeBlogByIdHandler);
