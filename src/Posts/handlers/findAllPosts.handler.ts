import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";
import {setDefaultSortAndPaginationIfNotExist} from "../../core/helpers/PostsSortAndPagination.helper";
import {mapToBlogsListPaginatedOutput} from "../../Blogs/mappers/map-blogs-list-pagination";
import {mapToPostsListPaginatedOutput} from "../mappers/map-posts-list-to-output";

export async function findAllPostsHandler(req:Request,res:Response) {
    try {
        const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
        const { items, totalCount } = await queryRepo.findPostsByCriteria(queryInput);
        // const posts = await queryRepo.findAllPosts();
        // const postsToView = posts.map(post => mapPostToViewModel(post));
        // const paginatedPosts = {}
        const postsToView = mapToPostsListPaginatedOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        });
        res.status(httpStatus.Ok).send(postsToView)
    }
    catch (error) {
        errorsHandler(error,res)
    }

}