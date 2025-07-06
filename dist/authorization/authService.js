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
exports.authService = void 0;
const ResultObject_model_1 = require("../core/core-types/ResultObject.model");
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
const jwtAdapter_adapter_1 = require("../adapters/jwtAdapter.adapter");
exports.authService = {
    authUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loginOrEmail, password } = dto;
            const user = yield this._checkUserCredentials(loginOrEmail, password);
            if (user.status !== ResultObject_model_1.ResultStatus.Success) {
                return {
                    status: user.status, data: null, error: { field: user.error.field, message: user.error.message }
                };
            }
            const acsessToken = yield jwtAdapter_adapter_1.jwtAdapter.createToken(user.data);
            return {
                status: ResultObject_model_1.ResultStatus.Success, data: acsessToken
            };
        });
    },
    _checkUserCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield data_acsess_layer_1.repository.findUserByLoginOrEmail(loginOrEmail, password);
            return { status: user.status, data: user.data, error: user.error };
        });
    }
};
