import {PaginationPostsViewModel} from "../../core/core-types/pagination-posts-view-model";
import {PostViewModel} from "../../Posts/dto/post-view-model";
import {BlogViewModel} from "../dto/blog-view-model";
import {WithId} from "mongodb";
import {Post} from "../../Posts/Post";

export function mapPostsForSpecificBlogPagination(posts: WithId<Post>[], meta:{pageNumber: number; pageSize: number; totalCount: number })
    :PaginationPostsViewModel{
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