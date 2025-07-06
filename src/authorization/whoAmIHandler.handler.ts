import {Request, Response} from 'express';
import {httpStatus} from "../core/core-types/http-statuses";
import {queryRepo} from "../core/repository/data-acsess-present-layer";
import {MeViewModel} from "./MeViewModel.model";
export async  function whoAmI(req: Request, res: Response): Promise<void> {
    const userId = req.userId as string;
    if(!userId) {
        //console.log('iternal server error in Auth',req.userId)
        res.sendStatus(httpStatus.InternalServerError);
        return
    }
    const me:MeViewModel | null = await queryRepo.findUserById(userId);
    if(!me){
        res.sendStatus(httpStatus.NotFound);
        return
    }
    res.sendStatus(httpStatus.Ok).send(me);
}