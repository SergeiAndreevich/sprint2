//import {SortDirection} from "mongodb";

export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
}
export type PaginationAndSorting<S> = {
    pageNumber: number;
    pageSize: number;
    sortBy: S;
    sortDirection: SortDirection;
    searchNameTerm?: string;
};

export enum BlogSortsFields {
    Name = 'name',
    CreatedAt = 'createdAt'
}
export enum PostsSortFields {
    CreatedAt = 'createdAt'
}
export type PaginatedOutput = {
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number
}