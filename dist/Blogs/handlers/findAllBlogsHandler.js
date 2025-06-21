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
exports.findAllBlogsHandler = findAllBlogsHandler;
const http_statuses_1 = require("../../core/core-types/http-statuses");
const data_acsess_present_layer_1 = require("../../core/repository/data-acsess-present-layer");
const map_blogs_list_pagination_1 = require("../mappers/map-blogs-list-pagination");
const BlogsSortAndPagination_helper_1 = require("../../core/helpers/BlogsSortAndPagination.helper");
function findAllBlogsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const blogs = await queryRepo.findAllBlogs();
            console.log('req.query', req.query); // сюда приходит объект и там есть searchNameTerm
            console.log('req.query.searchNameTerm', req.query.searchNameTerm);
            const queryInput = (0, BlogsSortAndPagination_helper_1.setDefaultSortAndPaginationIfNotExist)(req.query);
            //const queryToInputNew = createQueryDto(req.query);
            const { items, totalCount } = yield data_acsess_present_layer_1.queryRepo.findBlogsByCriteria(queryInput);
            const blogsToView = (0, map_blogs_list_pagination_1.mapToBlogsListPaginatedOutput)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount
            });
            //const blogsToView = blogs.map(blog=>mapBlogToViewModel(blog))
            res.send(blogsToView).status(http_statuses_1.httpStatus.Ok); // mb change the order
        }
        catch (e) {
            //console.log(e)
            res.sendStatus((http_statuses_1.httpStatus.InternalServerError));
        }
    });
}
