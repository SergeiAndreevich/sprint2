import {errorsHandler} from "../../core/helpers/errorsHandler.helper";
import {Request, Response} from "express";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {setDefaultSortAndPaginationIfNotExist} from "../../core/helpers/UsersSortAndPagination.helper";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function findAllUsers(req: Request, res: Response){
    try{
        //раскукоживаем что из query и добавляем дефолтные значения
        const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);
        //ищем в репозитории юзеров, фильтруем и мапим для отдачи

        const users = await queryRepo.findUsersListByCriteria(queryInput);
        //отдаем
        res.send(users).status(httpStatus.Ok);
    }
    catch(e){
        errorsHandler(e,res)
    }
}