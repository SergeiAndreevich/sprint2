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
exports.createBlogHandler = createBlogHandler;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const map_blog_to_view_model_1 = require("../mappers/map-blog-to-view-model");
const blogs_bll_service_1 = require("../BLL/blogs.bll.service");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const errorsHandler_helper_1 = require("../../core/helpers/errorsHandler.helper");
function createBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdId = yield blogs_bll_service_1.blogsService.createNewBlog(req.body);
            const createdBlog = yield data_acsess_present_layer_1.queryRepo.findBlogByIdOrFail(createdId);
            const blogToView = (0, map_blog_to_view_model_1.mapBlogToViewModel)(createdBlog);
            //console.log(blogToView);
            res.status(http_statuses_1.httpStatus.Created).send(blogToView);
        }
        catch (e) {
            console.log(e);
            (0, errorsHandler_helper_1.errorsHandler)(e, res);
        }
    });
}
