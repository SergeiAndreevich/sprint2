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
const http_statuses_1 = require("../../core/core-types/http-statuses");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //прокидываем данные в БД и возвращаем id
            const createdId = yield usersService_BLL_1.usersService.createNewUser(req.body);
            if (createdId === 'exist') {
                //console.log('error')
                res.sendStatus(700);
                return;
            }
            //по id получаем данные из БД и возвращаем ВьюМодельку
            const user = yield data_acsess_present_layer_1.queryRepo.findUserByIdOrFail(createdId);
            //в респонсе выдаем вьюшку и статус
            //console.log('user in Post-User',user);
            //console.log('res in users', res);
            res.status(http_statuses_1.httpStatus.Created).send(user);
        }
        catch (e) {
            console.log('asdfghjkl;lkjhgfffghjk', e); // ошибка не здесь
            res.status(600).send(e);
        }
    });
}
