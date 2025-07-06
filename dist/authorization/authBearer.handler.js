"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = authHandler;
const http_statuses_1 = require("../core/core-types/http-statuses");
const authService_1 = require("./authService");
const ResultObject_model_1 = require("../core/core-types/ResultObject.model");
function authHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield authService_1.authService.authUser(req.body);
        switch (result.status) {
            case ResultObject_model_1.ResultStatus.NotFound:
                res.sendStatus(http_statuses_1.httpStatus.NotFound);
                break;
            case ResultObject_model_1.ResultStatus.Unauthorized:
                res.sendStatus(http_statuses_1.httpStatus.Unauthorized);
                break;
            case ResultObject_model_1.ResultStatus.Success:
                res.status(http_statuses_1.httpStatus.Ok).send(result.data);
                break;
            default:
                res.status(http_statuses_1.httpStatus.InternalServerError).send('Unknown error');
                break;
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
    });
}
