import {Request, Response} from "express";
import {UserInputModel} from "../userInputModel";
import {usersService} from "../Users-BLL/usersService.BLL";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";
import {mapBlogToViewModel} from "../../Blogs/mappers/map-blog-to-view-model";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function createUserHandler (req: Request<{},{},UserInputModel>, res: Response){
    try{
        //прокидываем данные в БД и возвращаем id
        const createdId = await usersService.createNewUser(req.body)
        //по id получаем данные из БД и возвращаем ВьюМодельку
        const user = await queryRepo.findUserByIdOrFail(createdId);
        //в респонсе выдаем вьюшку и статус
        res.status(httpStatus.Created).send(user)
    }
    catch(e){
        errorsHandler(e,res)
    }

}