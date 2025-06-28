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
exports.findAllUsers = findAllUsers;
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const UsersSortAndPagination_helper_1 = require("../../core/helpers/UsersSortAndPagination.helper");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function findAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //раскукоживаем что из query и добавляем дефолтные значения
        const queryInput = (0, UsersSortAndPagination_helper_1.setDefaultSortAndPaginationIfNotExist)(req.query);
        //ищем в репозитории юзеров, фильтруем и мапим для отдачи
        const users = yield data_acsess_present_layer_1.queryRepo.findUsersListByCriteria(queryInput);
        //отдаем
        res.send(users).status(http_statuses_1.httpStatus.Ok);
    });
}
