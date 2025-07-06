import {Router} from "express";
import {AuthInputValidation} from "../core/validation/authInputValidation.validation";
import {checkValidationErrors} from "../core/validation/ValidationErrors";
import {authHandler} from "../authorization/authBearer.handler";

export const authRouter = Router({});

authRouter
    .post('/login', AuthInputValidation, checkValidationErrors, authHandler)
// проверили, корректно ли нам передали инпут
//собрали огибки валидации и кинули их в мидлвэре
// обработали в хэндлере - есть ошибки валидации 400, не совпали данные - 401, все ок 200
    .get('/me', AuthInputValidation, authHandler);