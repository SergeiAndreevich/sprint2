import { Request, Response } from 'express';
import {httpStatus} from "../../core/core-types/http-statuses";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {setDefaultSortAndPaginationIfNotExist} from "../../core/helpers/PostsSortAndPagination.helper";
import {mapPostsForSpecificBlogPagination} from "../mappers/map-posts-for-specific-blog-pagination";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";

export async function findPostsForSpecificBlogHandler(req:Request,res:Response) {
    try {
        // выставили значения пагинации
        const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);

        //ищем блог и его посты согласно критериям поиска
        const blog = await queryRepo.findBlogByIdOrFail(req.params.blogId);
        const blogId = blog._id.toString();
        const { items, totalCount } = await queryRepo.findPostsForSpecificBlog(blogId, queryInput);
        const blogAndPostsToView = mapPostsForSpecificBlogPagination(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        });

        //const blogsToView = blogs.map(blog=>mapBlogToViewModel(blog))
        res.send(blogAndPostsToView).status(httpStatus.Ok)  // mb change the order
    }
    catch(e){
        errorsHandler(e,res)
    }


}