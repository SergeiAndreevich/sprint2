"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSortAndPaginationIfNotExist = setDefaultSortAndPaginationIfNotExist;
const queryValidation_validation_1 = require("../validation/queryValidation.validation");
function setDefaultSortAndPaginationIfNotExist(query) {
    const filter = {
        pageSize: (query === null || query === void 0 ? void 0 : query.pageSize) ? +query.pageSize : queryValidation_validation_1.paginationAndSortingDefault.pageSize,
        pageNumber: (query === null || query === void 0 ? void 0 : query.pageNumber) ? +query.pageNumber : queryValidation_validation_1.paginationAndSortingDefault.pageNumber,
        sortBy: (query === null || query === void 0 ? void 0 : query.sortBy) ? query.sortBy : queryValidation_validation_1.paginationAndSortingDefault.sortBy,
        sortDirection: (query === null || query === void 0 ? void 0 : query.sortDirection) ? query.sortDirection : queryValidation_validation_1.paginationAndSortingDefault.sortDirection,
        searchLoginTerm: query === null || query === void 0 ? void 0 : query.searchLoginTerm,
        searchEmailTerm: query === null || query === void 0 ? void 0 : query.searchEmailTerm
    };
    return filter;
}
