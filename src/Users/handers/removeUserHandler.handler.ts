import {errorsHandler} from "../../core/helpers/errorsHandler.helper";
import {Request, Response} from "express";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {usersService} from "../Users-BLL/usersService.BLL";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function removeUserHandler (req:Request, res:Response){
    try {
        //получаем id из req.params
        const id = req.params.id;
        //ищем в квериРепо такое или фэйлим
        const foundUser = await queryRepo.findUserByIdOrFail(id);
        //а потом через БЛЛ и Репозиторий удаляем из БД
        await usersService.removeUserById(foundUser.id)
        //возвращаем статус
        res.sendStatus(httpStatus.NoContent)
    }
    catch (e) {
        errorsHandler(e,res)
    }
}