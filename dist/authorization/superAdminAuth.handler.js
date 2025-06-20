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
const errorsHandler_helper_1 = require("../core/helpers/errorsHandler.helper");
const data_acsess_present_layer_1 = require("../core/repository/data-acsess-present-layer");
const http_statuses_1 = require("../core/core-types/http-statuses");
function authHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authResponse = yield data_acsess_present_layer_1.queryRepo.checkAuthInfo(req.body);
            authResponse === true ?
                yield res.sendStatus(http_statuses_1.httpStatus.NoContent) :
                yield res.sendStatus(http_statuses_1.httpStatus.Unauthorized);
            //пришел пост-запрос с боди(логинИмэил, пароль)
            //в БЛЛ направляем инфу о том, что нужно сверить их с теми, что в БД
            //получаем из БД ответ, что есть они там или нет
            //если есть - статус код 204 и сообщение об авторизациии
            //если нет - статус 401 и сообщение "неверные данные для входа"
        }
        catch (e) {
            (0, errorsHandler_helper_1.errorsHandler)(e, res);
        }
    });
}
