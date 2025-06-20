import {BlogSortsFields, PaginationAndSorting, PostsSortFields} from "../core-types/pagination-and-sorting";
import {paginationAndSortingDefault} from "../validation/queryValidation.validation";

export function setDefaultSortAndPaginationIfNotExist<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<PostsSortFields> {
    return {
        ...paginationAndSortingDefault,
        ...query,
        sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as PostsSortFields,
    };
}