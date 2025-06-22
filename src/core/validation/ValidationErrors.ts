import {NextFunction, Request, Response} from 'express';
import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import {httpStatus} from "../core-types/http-statuses";

//то что приходит по факту. Некоторые поля могу быть пустыми
export type ValidationErrorExample = {
    field: string,
    message: string
    // status: httpStatus;
    // detail: string;
    // source?: string;
    // code?: string
}
// то что видит пользователь. Тут все поля должны быть заполнены
export type ValidationErrorOutput = {
    status: httpStatus;
    detail: string;
    source: { pointer: string };
    code: string | null;
}
export type ValidationErrorsStore = {
    errorsMessages: ValidationErrorExample[]
}

export const createErrorMessage = (errors: ValidationErrorExample[]):ValidationErrorsStore =>{
    return {
        errorsMessages:errors
        // errors: errors.map((error)=>({
        //     status: error.status,
        //     detail: error.detail, //error message
        //     source: { pointer: error.source ?? '' }, //error field
        //     code: error.code ?? null, //domain error code
        // }))
    }
}

const formatErrors = (error: ValidationError) => {
    const myErrorView = error as unknown as FieldValidationError; // на вход получаю ошибку,
    // так как это валидация, то от объекта ValidationError мне нужен лишь подобъект FieldValidationError
    // у него есть свойства type, location, path, value?, msg

    //error as unknown as FieldValidationError: Выполняет приведение типов (type casting). Этот шаг необходим, потому что TypeScript не позволяет напрямую приводить типы, которые не связаны друг с другом. В данном случае ValidationError и FieldValidationError могут не быть напрямую связаны в иерархии типов.
    //    error as unknown: Сначала приводится тип error к типу unknown. unknown - это специальный тип в TypeScript, который может представлять любое значение.
    //    as FieldValidationError: Затем тип unknown приводится к типу FieldValidationError. Тип FieldValidationError более специфичен, чем ValidationError, и представляет собой ошибку валидации, связанную с конкретным полем. Он, вероятно, содержит свойства, специфичные для ошибок, связанных с полями (например, имя поля).
    return {
         field: myErrorView.path,
         message: myErrorView.msg,
        // status: httpStatus.BadRequest,
        // source: myErrorView.path,
        // detail: myErrorView.msg
    };
};

export const checkValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)
        .formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        const blogIdError = errors.find(error => error.field === "blogId");
        // Проверяем, найдена ли ошибка
        //console.log('errors in CheckErrorsHandler', errors)
        if(errors.length === 1 && blogIdError) {
            res.status(httpStatus.NotFound).send(createErrorMessage(errors))
            return;
        }
        // if (blogIdError) {
        //     //console.log(`blog id error`, blogIdError)
        //     res.status(httpStatus.NotFound).send(createErrorMessage(errors))
        //     return;
        // }
        //res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
        res.status(httpStatus.BadRequest).send(createErrorMessage(errors));
        return;
    }

    next();
};
