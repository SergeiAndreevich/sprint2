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
exports.findAllPostsHandler = findAllPostsHandler;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const errorsHandler_helper_1 = require("../../core/helpers/errorsHandler.helper");
const PostsSortAndPagination_helper_1 = require("../../core/helpers/PostsSortAndPagination.helper");
const map_posts_list_to_output_1 = require("../mappers/map-posts-list-to-output");
function findAllPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryInput = (0, PostsSortAndPagination_helper_1.setDefaultSortAndPaginationIfNotExist)(req.query);
            const { items, totalCount } = yield data_acsess_present_layer_1.queryRepo.findPostsByCriteria(queryInput);
            // const posts = await queryRepo.findAllPosts();
            // const postsToView = posts.map(post => mapPostToViewModel(post));
            // const paginatedPosts = {}
            const postsToView = (0, map_posts_list_to_output_1.mapToPostsListPaginatedOutput)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount
            });
            res.status(http_statuses_1.httpStatus.Ok).send(postsToView);
        }
        catch (error) {
            (0, errorsHandler_helper_1.errorsHandler)(error, res);
        }
    });
}
