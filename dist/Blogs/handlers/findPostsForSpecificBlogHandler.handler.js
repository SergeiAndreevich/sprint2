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
exports.findPostsForSpecificBlogHandler = findPostsForSpecificBlogHandler;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const PostsSortAndPagination_helper_1 = require("../../core/helpers/PostsSortAndPagination.helper");
const map_posts_for_specific_blog_pagination_1 = require("../mappers/map-posts-for-specific-blog-pagination");
const errorsHandler_helper_1 = require("../../core/helpers/errorsHandler.helper");
function findPostsForSpecificBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // выставили значения пагинации
            const queryInput = (0, PostsSortAndPagination_helper_1.setDefaultSortAndPaginationIfNotExist)(req.query);
            //ищем блог и его посты согласно критериям поиска
            const blog = yield data_acsess_present_layer_1.queryRepo.findBlogByIdOrFail(req.params.blogId);
            const blogId = blog._id.toString();
            const { items, totalCount } = yield data_acsess_present_layer_1.queryRepo.findPostsForSpecificBlog(blogId, queryInput);
            const blogAndPostsToView = (0, map_posts_for_specific_blog_pagination_1.mapPostsForSpecificBlogPagination)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount
            });
            //const blogsToView = blogs.map(blog=>mapBlogToViewModel(blog))
            res.send(blogAndPostsToView).status(http_statuses_1.httpStatus.Ok); // mb change the order
        }
        catch (e) {
            (0, errorsHandler_helper_1.errorsHandler)(e, res);
        }
    });
}
