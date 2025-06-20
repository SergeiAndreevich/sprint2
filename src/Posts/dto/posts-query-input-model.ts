import {PaginationAndSorting, PostsSortFields} from "../../core/core-types/pagination-and-sorting";

export type PostsQueryInput = PaginationAndSorting<PostsSortFields> &
    Partial<{
        searchPostNameTerm: string;
    }>;
