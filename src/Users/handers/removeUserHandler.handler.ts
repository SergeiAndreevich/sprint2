import {errorsHandler} from "../../core/helpers/errorsHandler.helper";
import {Request, Response} from "express";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {usersService} from "../Users-BLL/usersService.BLL";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function removeUserHandler (req:Request, res:Response): Promise<void>{
        //получаем id из req.params
        const id = req.params.id;
        //ищем в квериРепо такое или фэйлим
        const foundUser = await queryRepo.findUserByIdOrFail(id);
        if(foundUser === null){
            res.sendStatus(httpStatus.NotFound).send({error: "User not found"});
            return
        }
        //а потом через БЛЛ и Репозиторий удаляем из БД
        await usersService.removeUserById(foundUser.id)
        //возвращаем статус
        res.sendStatus(httpStatus.NoContent)
}