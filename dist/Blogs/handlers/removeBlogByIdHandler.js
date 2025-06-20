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
exports.removeBlogByIdHandler = removeBlogByIdHandler;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const blogs_bll_service_1 = require("../BLL/blogs.bll.service");
const errorsHandler_helper_1 = require("../../core/helpers/errorsHandler.helper");
function removeBlogByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const blog = yield data_acsess_present_layer_1.queryRepo.findBlogByIdOrFail(id);
            // if(!blog){
            //     res.status(httpStatus.NotFound).send(
            //         createErrorMessage([{ field: 'id', message: 'Blog not found' }]),
            //     );
            //     return
            // }
            yield blogs_bll_service_1.blogsService.removeBlogById(id);
            res.sendStatus(http_statuses_1.httpStatus.NoContent);
        }
        catch (e) {
            (0, errorsHandler_helper_1.errorsHandler)(e, res);
        }
    });
}
