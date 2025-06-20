import {Request, Response} from "express";
import {PostInputModel} from "../dto/post-input-model";
import {postsService} from "../BLL/posts.bll.service";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";
import {httpStatus} from "../../core/core-types/http-statuses";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";
import {BlogPostInputModel} from "../../core/core-types/blogPostInputModel";

export async function createPostForSpecificBlogHandler(req:Request<{blogId:string},{},BlogPostInputModel>,res:Response){
    try {
        const data = req.body;
        const createdPostId = await postsService.createNewPost({...data, blogId: req.params.blogId});
        const createdPost = await queryRepo.findPostByIdOrFail(createdPostId);
        const newPostToView = mapPostToViewModel(createdPost);
        res.status(httpStatus.Created).send(newPostToView)
    }
    catch (e){
        errorsHandler(e,res)
    }
}