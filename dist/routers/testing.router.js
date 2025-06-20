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
exports.testingRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../core/core-types/http-statuses");
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
const data_acsess_present_layer_1 = require("../core/repository/data-acsess-present-layer");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter
    .delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield data_acsess_layer_1.repository.removeAll();
    //localDB.posts = [];
    //localDB.blogs = [];
    res.sendStatus(http_statuses_1.httpStatus.NoContent);
    return;
}))
    .get('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allData = yield data_acsess_present_layer_1.queryRepo.findAll();
    res.status(http_statuses_1.httpStatus.Ok).send(allData);
}));
