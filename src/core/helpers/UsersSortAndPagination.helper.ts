import {PaginationAndSorting, UsersSortFields} from "../core-types/pagination-and-sorting";
import {
    paginationAndSortingDefault
} from "../validation/queryValidation.validation";

export function setDefaultSortAndPaginationIfNotExist<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<UsersSortFields> {

    const filter = {
        pageSize:query?.pageSize ? +query.pageSize : paginationAndSortingDefault.pageSize,
        pageNumber:query?.pageNumber ? +query.pageNumber : paginationAndSortingDefault.pageNumber,
        sortBy: query?.sortBy  ? query.sortBy as UsersSortFields :  paginationAndSortingDefault.sortBy as UsersSortFields,
        sortDirection: query?.sortDirection   ? query.sortDirection : paginationAndSortingDefault.sortDirection,
        searchLoginTerm: query?.searchLoginTerm,
        searchEmailTerm: query?.searchEmailTerm

    }

    return filter
}