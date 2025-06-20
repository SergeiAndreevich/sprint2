"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultSortAndPaginationIfNotExist = setDefaultSortAndPaginationIfNotExist;
const queryValidation_validation_1 = require("../validation/queryValidation.validation");
function setDefaultSortAndPaginationIfNotExist(query) {
    var _a;
    return Object.assign(Object.assign(Object.assign({}, queryValidation_validation_1.paginationAndSortingDefault), query), { sortBy: ((_a = query.sortBy) !== null && _a !== void 0 ? _a : queryValidation_validation_1.paginationAndSortingDefault.sortBy) });
}
