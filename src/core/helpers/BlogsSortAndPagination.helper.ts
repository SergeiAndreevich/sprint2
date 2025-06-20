import {BlogSortsFields, PaginationAndSorting, PostsSortFields} from "../core-types/pagination-and-sorting";
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY, DEFAULT_SORT_DIRECTION,
    paginationAndSortingDefault
} from "../validation/queryValidation.validation";
import {FilterResult, QueryParams} from "../../Blogs/dto/blogs-query-input-model";

export function setDefaultSortAndPaginationIfNotExist<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<BlogSortsFields> {

    const filter = {
        pageSize:query?.pageSize ? +query.pageSize : DEFAULT_PAGE_SIZE,
        pageNumber:query?.pageNumber ? +query.pageNumber : DEFAULT_PAGE_NUMBER,
        sortBy: query?.sortBy  ? query.sortBy as BlogSortsFields :  paginationAndSortingDefault.sortBy as BlogSortsFields,
        sortDirection: query?.sortDirection   ? query.sortDirection : DEFAULT_SORT_DIRECTION,
        searchNameTerm: query?.searchNameTerm // Добавляем searchNameTerm

    }

    return filter
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