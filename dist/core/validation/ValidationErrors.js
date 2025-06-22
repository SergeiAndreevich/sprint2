"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationErrors = exports.createErrorMessage = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../core-types/http-statuses");
const createErrorMessage = (errors) => {
    return {
        errorsMessages: errors
        // errors: errors.map((error)=>({
        //     status: error.status,
        //     detail: error.detail, //error message
        //     source: { pointer: error.source ?? '' }, //error field
        //     code: error.code ?? null, //domain error code
        // }))
    };
};
exports.createErrorMessage = createErrorMessage;
const formatErrors = (error) => {
    const myErrorView = error; // на вход получаю ошибку,
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
const checkValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req)
        .formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length > 0) {
        const blogIdError = errors.find(error => error.field === "blogId");
        // Проверяем, найдена ли ошибка
        //console.log('errors in CheckErrorsHandler', errors)
        if (errors.length === 1 && blogIdError) {
            res.status(http_statuses_1.httpStatus.NotFound).send((0, exports.createErrorMessage)(errors));
            return;
        }
        // if (blogIdError) {
        //     //console.log(`blog id error`, blogIdError)
        //     res.status(httpStatus.NotFound).send(createErrorMessage(errors))
        //     return;
        // }
        //res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
        res.status(http_statuses_1.httpStatus.BadRequest).send((0, exports.createErrorMessage)(errors));
        return;
    }
    next();
};
exports.checkValidationErrors = checkValidationErrors;
