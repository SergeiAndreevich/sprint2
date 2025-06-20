"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPostsForSpecificBlogPagination = mapPostsForSpecificBlogPagination;
function mapPostsForSpecificBlogPagination(posts, meta) {
    return {
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: posts.map((post) => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        })),
    };
}
