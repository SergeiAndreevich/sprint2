import { Request, Response } from 'express';
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";
import {blogsService} from "../BLL/blogs.bll.service";
import {WithId} from "mongodb";
import {Blog} from "../Blog";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";

export async function findBlogByIdHandler(req:Request,res:Response) {
    try {
        const blog:WithId<Blog> = await queryRepo.findBlogByIdOrFail(req.params.id);
        // if(!blog){
        //     res.status(httpStatus.NotFound).send(
        //         createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
        //     );
        //     return
        // }
        const blogToView = mapBlogToViewModel(blog);
        res.status(httpStatus.Ok).send(blogToView)  // check the order
    }
    catch(e){
        errorsHandler(e,res)
    }


}