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
exports.createUserHandler = createUserHandler;
const usersService_BLL_1 = require("../Users-BLL/usersService.BLL");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const errorsHandler_helper_1 = require("../../core/helpers/errorsHandler.helper");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //прокидываем данные в БД и возвращаем id
            const createdId = yield usersService_BLL_1.usersService.createNewUser(req.body);
            //по id получаем данные из БД и возвращаем ВьюМодельку
            const user = yield data_acsess_present_layer_1.queryRepo.findUserByIdOrFail(createdId);
            //в респонсе выдаем вьюшку и статус
            res.status(http_statuses_1.httpStatus.Created).send(user);
        }
        catch (e) {
            (0, errorsHandler_helper_1.errorsHandler)(e, res);
        }
    });
}
