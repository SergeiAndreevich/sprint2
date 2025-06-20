import {Request, Response} from "express";
import {UserInputModel} from "../userInputModel";

export async function createUserHandler (req: Request<{},{},UserInputModel>, res: Response){
    //прокидываем данные в БД и возвращаем id
    //по id получаем данные из БД и возвращаем ВьюМодельку
    //в респонсе выдаем вьюшку и статус
}