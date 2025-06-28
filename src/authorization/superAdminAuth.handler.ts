import {Request,Response} from "express";
import {LoginInputModel} from "./LoginInputModel";
import {errorsHandler} from "../core/helpers/errorsHandler.helper";
import {queryRepo} from "../core/repository/data-acsess-present-layer";
import {httpStatus} from "../core/core-types/http-statuses";

export async function  authHandler (req: Request<{},{},LoginInputModel>, res: Response) {

        const authResponse = await queryRepo.checkAuthInfo(req.body);
        authResponse === true ?
            await res.sendStatus(httpStatus.NoContent) :
            await res.sendStatus(httpStatus.Unauthorized)
        //пришел пост-запрос с боди(логинИлиИмэил, пароль)
        //в БЛЛ направляем инфу о том, что нужно сверить их с теми, что в БД
        //получаем из БД ответ, что есть они там или нет
        //если есть - статус код 204 и сообщение об авторизациии
        //если нет - статус 401 и сообщение "неверные данные для входа"
}