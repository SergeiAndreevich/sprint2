import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";
import {Post} from "../Post";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";
import {postsService} from "../BLL/posts.bll.service";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";


export async function createPostHandler(req:Request<{},{},PostInputModel>,res:Response){
    try {
        const createdPostId = await postsService.createNewPost(req.body);
        const createdPost = await queryRepo.findPostByIdOrFail(createdPostId);
        const newPostToView = mapPostToViewModel(createdPost);
        res.status(httpStatus.Created).send(newPostToView)
    }
    catch (e){
        errorsHandler(e,res)
    }
}