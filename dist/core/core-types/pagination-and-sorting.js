"use strict";
//import {SortDirection} from "mongodb";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsSortFields = exports.BlogSortsFields = exports.SortDirection = void 0;
var SortDirection;
(function (SortDirection) {
    SortDirection["Asc"] = "asc";
    SortDirection["Desc"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
var BlogSortsFields;
(function (BlogSortsFields) {
    BlogSortsFields["Name"] = "name";
    BlogSortsFields["CreatedAt"] = "createdAt";
})(BlogSortsFields || (exports.BlogSortsFields = BlogSortsFields = {}));
var PostsSortFields;
(function (PostsSortFields) {
    PostsSortFields["CreatedAt"] = "createdAt";
})(PostsSortFields || (exports.PostsSortFields = PostsSortFields = {}));
