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
exports.whoAmI = whoAmI;
const http_statuses_1 = require("../core/core-types/http-statuses");
const data_acsess_present_layer_1 = require("../core/repository/data-acsess-present-layer");
function whoAmI(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        if (!userId) {
            //console.log('iternal server error in Auth',req.userId)
            res.sendStatus(http_statuses_1.httpStatus.InternalServerError);
            return;
        }
        const me = yield data_acsess_present_layer_1.queryRepo.findUserById(userId);
        if (!me) {
            res.sendStatus(http_statuses_1.httpStatus.NotFound);
            return;
        }
        res.sendStatus(http_statuses_1.httpStatus.Ok).send(me);
    });
}
