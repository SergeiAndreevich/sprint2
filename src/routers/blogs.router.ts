import { Router } from 'express';
import {createBlogHandler} from "../Blogs/handlers/createBlog.handler";
import {findAllBlogsHandler} from "../Blogs/handlers/findAllBlogsHandler";
import {findBlogByIdHandler} from "../Blogs/handlers/findBlogByIdHandler";
import {removeBlogByIdHandler} from "../Blogs/handlers/removeBlogByIdHandler";
import {updateBlogByIdHandler} from "../Blogs/handlers/updateBlogByIdHandler";
import {idValidation} from "../core/validation/checkId.validation";
import {blogInputModelValidation} from "../core/validation/InputBlog.validation";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {authorizeMiddleware} from "../authorization/authorization.middleware";
import {paginationAndSortingValidation} from "../core/validation/queryValidation.validation";
import {BlogSortsFields, PostsSortFields} from "../core/core-types/pagination-and-sorting";
import {blogIdValidation} from "../core/validation/blogIdValidation.validation";
import {findPostsForSpecificBlogHandler} from "../Blogs/handlers/findPostsForSpecificBlogHandler.handler";
import {postInputModelValidation} from "../core/validation/InputPost.validation";
import {createPostForSpecificBlogHandler} from "../Posts/handlers/createPostForSpecificBlogHandler.handler";
import {BlogPostInputModelValidation} from "../core/validation/blogPostInput.validation";

export const blogsRouter = Router({});

blogsRouter
    .get('', paginationAndSortingValidation(BlogSortsFields), checkValidationErrors, findAllBlogsHandler)
    .get('/:id',idValidation, checkValidationErrors, findBlogByIdHandler)
    .get('/:blogId/posts', blogIdValidation, paginationAndSortingValidation(PostsSortFields), checkValidationErrors, findPostsForSpecificBlogHandler)
    .post('', authorizeMiddleware, blogInputModelValidation, checkValidationErrors, createBlogHandler)
    .post('/:blogId/posts',blogIdValidation, authorizeMiddleware,BlogPostInputModelValidation,checkValidationErrors,createPostForSpecificBlogHandler)
    .put('/:id', authorizeMiddleware, idValidation,blogInputModelValidation, checkValidationErrors, updateBlogByIdHandler)
    .delete('/:id', authorizeMiddleware, idValidation, checkValidationErrors, removeBlogByIdHandler)