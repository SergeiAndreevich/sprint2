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
exports.removeUserHandler = removeUserHandler;
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const usersService_BLL_1 = require("../Users-BLL/usersService.BLL");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function removeUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //получаем id из req.params
        const id = req.params.id;
        //ищем в квериРепо такое или фэйлим
        const foundUser = yield data_acsess_present_layer_1.queryRepo.findUserByIdOrFail(id);
        if (foundUser === null) {
            res.sendStatus(http_statuses_1.httpStatus.NotFound).send({ error: "User not found" });
            return;
        }
        //а потом через БЛЛ и Репозиторий удаляем из БД
        yield usersService_BLL_1.usersService.removeUserById(foundUser.id);
        //возвращаем статус
        res.sendStatus(http_statuses_1.httpStatus.NoContent);
    });
}
