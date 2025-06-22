import {WithId} from "mongodb";
import {Blog} from "../../Blogs/Blog";
import {PaginationPostsViewModel, PaginationViewModels} from "../../core/core-types/pagination-view-models";
import {BlogViewModel} from "../../Blogs/dto/blog-view-model";
import {Post} from "../Post";
import {PostViewModel} from "../dto/post-view-model";

export function mapToPostsListPaginatedOutput(
    posts: WithId<Post>[],
    meta: { pageNumber: number; pageSize: number; totalCount: number },
): PaginationPostsViewModel {
    return {
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: posts.map(
            (post): PostViewModel => ({
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }),
        ),
    };
}