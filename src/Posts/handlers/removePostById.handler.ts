import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {createErrorMessage} from "../../core/validation/ValidationErrors";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {postsService} from "../BLL/posts.bll.service";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";

export async function removePostByIdHandler(req:Request,res:Response) {
    try {
        const id = req.params.id;
        await queryRepo.findPostByIdOrFail(id);
        // if(!post){
        //     res.status(httpStatus.NotFound).send(
        //         createErrorMessage([{ field: 'id', message: 'Post not found' }]),
        //     );
        //     return
        // }
        await postsService.removePostById(id);
        res.sendStatus(httpStatus.NoContent)
    }
    catch (e){
        errorsHandler(e,res)
    }

}