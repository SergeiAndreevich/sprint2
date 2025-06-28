"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSortAndPaginationIfNotExist = setDefaultSortAndPaginationIfNotExist;
const queryValidation_validation_1 = require("../validation/queryValidation.validation");
function setDefaultSortAndPaginationIfNotExist(query) {
    var _a;
    return {
        pageNumber: query.pageNumber ? Number(query.pageNumber) : queryValidation_validation_1.paginationAndSortingDefault.pageNumber,
        pageSize: query.pageSize ? Number(query.pageSize) : queryValidation_validation_1.paginationAndSortingDefault.pageSize,
        sortBy: ((_a = query.sortBy) !== null && _a !== void 0 ? _a : queryValidation_validation_1.paginationAndSortingDefault.sortBy),
        sortDirection: query.sortDirection ? query.sortDirection : queryValidation_validation_1.paginationAndSortingDefault.sortDirection,
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : '',
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : '',
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : ''
    };
}
