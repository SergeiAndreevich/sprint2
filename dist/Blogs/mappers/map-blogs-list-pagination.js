"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogsListPaginatedOutput = mapToBlogsListPaginatedOutput;
function mapToBlogsListPaginatedOutput(blogs, meta) {
    return {
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: blogs.map((blog) => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        })),
    };
}
