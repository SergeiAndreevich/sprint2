import {BlogViewModel} from "../../Blogs/dto/blog-view-model";
import {PostViewModel} from "../../Posts/dto/post-view-model";
import {UserViewModel} from "../../Users/UserViewModel";

export type PaginationViewModels = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogViewModel[]
}

export type PaginationPostsViewModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostViewModel[]
}

export type PaginationUsersViewModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserViewModel[]
}