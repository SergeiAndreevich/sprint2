"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSortAndPaginationIfNotExist = setDefaultSortAndPaginationIfNotExist;
const queryValidation_validation_1 = require("../validation/queryValidation.validation");
function setDefaultSortAndPaginationIfNotExist(query) {
    const filter = {
        pageSize: (query === null || query === void 0 ? void 0 : query.pageSize) ? +query.pageSize : queryValidation_validation_1.DEFAULT_PAGE_SIZE,
        pageNumber: (query === null || query === void 0 ? void 0 : query.pageNumber) ? +query.pageNumber : queryValidation_validation_1.DEFAULT_PAGE_NUMBER,
        sortBy: (query === null || query === void 0 ? void 0 : query.sortBy) ? query.sortBy : queryValidation_validation_1.paginationAndSortingDefault.sortBy,
        sortDirection: (query === null || query === void 0 ? void 0 : query.sortDirection) ? query.sortDirection : queryValidation_validation_1.DEFAULT_SORT_DIRECTION,
        searchNameTerm: query === null || query === void 0 ? void 0 : query.searchNameTerm // Добавляем searchNameTerm
    };
    return filter;
}
// export function setDefaultSortAndPaginationIfNotExist(query: QueryParams): FilterResult {
//     const filterResult: FilterResult = {
//         pageSize: query?.pageSize ? +query.pageSize : DEFAULT_PAGE_SIZE,
//         pageNumber: query?.pageNumber ? +query.pageNumber : DEFAULT_PAGE_NUMBER,
//         sortBy: query?.sortBy ? query.sortBy : paginationAndSortingDefault.sortBy,
//         sortDirection: query?.sortDirection ? query.sortDirection : DEFAULT_SORT_DIRECTION,
//         searchNameTerm: query?.searchNameTerm, // Добавляем searchNameTerm
//     };
//     return filterResult;
// }
