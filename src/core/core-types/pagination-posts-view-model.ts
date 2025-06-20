import {PostViewModel} from "../../Posts/dto/post-view-model";

export type PaginationPostsViewModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostViewModel[]
}