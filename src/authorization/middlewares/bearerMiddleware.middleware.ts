import {NextFunction, Request, Response} from "express";
import {httpStatus} from "../../core/core-types/http-statuses";
import {isHigherPrecedenceThanAwait} from "@typescript-eslint/eslint-plugin/dist/util";
import {jwtAdapter} from "../../adapters/jwtAdapter.adapter";
import {JwtPayload} from "jsonwebtoken";

// Расширяем интерфейс Request, чтобы добавить свойство user
declare global {
    namespace Express {
        interface Request {
            userId?:  string // Знак вопроса делает свойство необязательным
        }
    }
}

export const tokenGuard = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    //проверка, пришел ли токен
    if(!authHeader) {
        res.sendStatus(httpStatus.Unauthorized);
        return
    }
    //если пришло что-то в headers, надо это оттуда достать
    const [authType, token] = authHeader.split(' ');
    //если не токен-авторизация, то не выдадим доступ
    if(authType !== 'Bearer') {
        res.sendStatus(httpStatus.Unauthorized);
        return
    }
    //если не извлекся токен
    if (!token){
        res.sendStatus(httpStatus.Unauthorized)
        return
    }

    const payload =  await jwtAdapter.verifyToken(token);
    if(!payload) {
        res.sendStatus(httpStatus.Unauthorized);
        return
    }
    const {id, role} = payload as JwtPayload;
    //console.log('userId in authGuard middleware', payload, id,role);
    req.userId = id.toString();
    next()
    //console.log('request contains after authMe', req.userId)
}