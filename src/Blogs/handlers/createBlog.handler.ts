import {BlogInputModel} from "../dto/blog-input-model";
import {Request,Response} from "express";
import {Blog} from "../Blog";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapPostToViewModel} from "../../Posts/mappers/map-post-to-view-model";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";
import {blogsService} from "../BLL/blogs.bll.service";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";


export async function createBlogHandler(req:Request<{},{},BlogInputModel>,res:Response){
    try{
        const createdId  = await blogsService.createNewBlog(req.body);
        const createdBlog = await queryRepo.findBlogByIdOrFail(createdId);
        const blogToView = mapBlogToViewModel(createdBlog);
        //console.log(blogToView);
        res.status(httpStatus.Created).send(blogToView)
    }
    catch (e){
        errorsHandler(e,res)
    }
}