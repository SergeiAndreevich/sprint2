import {Request,Response} from "express";
import {LoginInputModel} from "./LoginInputModel";
import {errorsHandler} from "../core/helpers/errorsHandler.helper";

export const authHandler = (req: Request<{},{},LoginInputModel>, res: Response) =>{
    try{

    }
    catch(e){
        errorsHandler(e,res)
    }
}