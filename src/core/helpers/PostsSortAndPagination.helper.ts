import {BlogSortsFields, PaginationAndSorting, PostsSortFields} from "../core-types/pagination-and-sorting";
import {paginationAndSortingDefault} from "../validation/queryValidation.validation";

export function setDefaultSortAndPaginationIfNotExist<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<PostsSortFields> {
    return {
        pageNumber: query.pageNumber ? Number(query.pageNumber) : paginationAndSortingDefault.pageNumber,
        pageSize: query.pageSize ? Number(query.pageSize) : paginationAndSortingDefault.pageSize,
        sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as PostsSortFields,
        sortDirection: query.sortDirection ? query.sortDirection : paginationAndSortingDefault.sortDirection,
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : '',
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : '',
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm :''
    }

}