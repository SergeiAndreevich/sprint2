import { Request, Response } from 'express';
import {httpStatus} from "../../core/core-types/http-statuses";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {mapToBlogsListPaginatedOutput} from "../mappers/map-blogs-list-pagination";
import {setDefaultSortAndPaginationIfNotExist} from "../../core/helpers/BlogsSortAndPagination.helper";

export async function findAllBlogsHandler(req:Request,res:Response) {
    try{
        //const blogs = await queryRepo.findAllBlogs();

        console.log('req.query',req.query) // сюда приходит объект и там есть searchNameTerm

        console.log('req.query.searchNameTerm',req.query.searchNameTerm)
        const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
        //const queryToInputNew = createQueryDto(req.query);

        const { items, totalCount } = await queryRepo.findBlogsByCriteria(queryInput);
        const blogsToView = mapToBlogsListPaginatedOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        });

        //const blogsToView = blogs.map(blog=>mapBlogToViewModel(blog))
        res.send(blogsToView).status(httpStatus.Ok)  // mb change the order
    }
    catch(e){
        console.log(e)
        res.sendStatus((httpStatus.InternalServerError))
    }
}