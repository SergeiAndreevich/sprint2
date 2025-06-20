import {BlogViewModel} from "../../Blogs/dto/blog-view-model";

export type PaginationBlogsViewModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogViewModel[]
}