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
exports.findPostByIdHandler = findPostByIdHandler;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const map_post_to_view_model_1 = require("../mappers/map-post-to-view-model");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const errorsHandler_helper_1 = require("../../core/helpers/errorsHandler.helper");
function findPostByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield data_acsess_present_layer_1.queryRepo.findPostByIdOrFail(req.params.id);
            // if(!post){
            //     res.status(httpStatus.NotFound).send(
            //         createErrorMessage([{ field: 'id', message: 'Post not found' }]),
            //     );
            //     return
            // }
            const postToView = (0, map_post_to_view_model_1.mapPostToViewModel)(post);
            res.status(http_statuses_1.httpStatus.Ok).send(postToView);
        }
        catch (e) {
            (0, errorsHandler_helper_1.errorsHandler)(e, res);
        }
    });
}
