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
exports.tokenGuard = void 0;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const jwtAdapter_adapter_1 = require("../../adapters/jwtAdapter.adapter");
const tokenGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    //проверка, пришел ли токен
    if (!authHeader) {
        res.sendStatus(http_statuses_1.httpStatus.Unauthorized);
        return;
    }
    //если пришло что-то в headers, надо это оттуда достать
    const [authType, token] = authHeader.split(' ');
    //если не токен-авторизация, то не выдадим доступ
    if (authType !== 'Bearer') {
        res.sendStatus(http_statuses_1.httpStatus.Unauthorized);
        return;
    }
    //если не извлекся токен
    if (!token) {
        res.sendStatus(http_statuses_1.httpStatus.Unauthorized);
        return;
    }
    const payload = yield jwtAdapter_adapter_1.jwtAdapter.verifyToken(token);
    if (!payload) {
        res.sendStatus(http_statuses_1.httpStatus.Unauthorized);
        return;
    }
    const { id, role } = payload;
    //console.log('userId in authGuard middleware', payload, id,role);
    req.userId = id.toString();
    next();
    //console.log('request contains after authMe', req.userId)
});
exports.tokenGuard = tokenGuard;
