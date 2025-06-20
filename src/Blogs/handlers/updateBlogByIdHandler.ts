import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {localDB} from "../../db/mock-db.db";
import {BlogInputModel} from "../dto/blog-input-model";
import {createErrorMessage} from "../../core/validation/ValidationErrors";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {blogsService} from "../BLL/blogs.bll.service";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";

export async function updateBlogByIdHandler(req:Request<{id:string},{},BlogInputModel>,res:Response) {
    //const blog = repository.findBlogById(req.params.id);
    try {
        const id = req.params.id;
        const blog = await queryRepo.findBlogByIdOrFail(id);
        // if(!blog){
        //     res.status(httpStatus.NotFound).send(
        //         createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
        //     );
        //     return
        // }
        await blogsService.updateBlog(id,req.body);
        res.sendStatus(httpStatus.NoContent)
    }
    catch (e){
        errorsHandler(e,res)
    }
}