import {Request, Response} from "express";
import {LoginInputModel} from "./LoginInputModel";
import {queryRepo} from "../core/repository/data-acsess-present-layer";
import {httpStatus} from "../core/core-types/http-statuses";
import {authService} from "./authService";
import {ResultStatus} from "../core/core-types/ResultObject.model";

export async function  authHandler (req: Request<{},{},LoginInputModel>, res: Response) {

        const result = await authService.authUser(req.body);
        switch (result.status) {
                case ResultStatus.NotFound:
                        res.sendStatus(httpStatus.NotFound);
                        break;
                case ResultStatus.Unauthorized:
                        res.sendStatus(httpStatus.Unauthorized);
                        break
                case ResultStatus.Success:
                        res.status(httpStatus.Ok).send(result.data);
                        break
                default:
                        res.status(httpStatus.InternalServerError).send('Unknown error');
                        break
        }
        // const authResponse = await queryRepo.checkAuthInfo(req.body);
        // authResponse === true ?
        //     await res.sendStatus(httpStatus.NoContent) :
        //     await res.sendStatus(httpStatus.Unauthorized)
        //пришел пост-запрос с боди(логинИлиИмэил, пароль)
        //в БЛЛ направляем инфу о том, что нужно сверить их с теми, что в БД
        //получаем из БД ответ, что есть они там или нет
        //если есть - статус код 204 и сообщение об авторизациии
        //если нет - статус 401 и сообщение "неверные данные для входа"
}