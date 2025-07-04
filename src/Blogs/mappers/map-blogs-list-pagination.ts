import {Blog} from "../Blog";
import {WithId} from "mongodb";
import {BlogViewModel} from "../dto/blog-view-model";
import {PaginatedOutput} from "../../core/core-types/pagination-and-sorting";
import {PaginationViewModels} from "../../core/core-types/pagination-view-models";

export type BlogsListPaginatedOutput = {
    meta: PaginatedOutput;
    data: BlogViewModel[];
};

export function mapToBlogsListPaginatedOutput(
    blogs: WithId<Blog>[],
    meta: { pageNumber: number; pageSize: number; totalCount: number },
): PaginationViewModels {
    return {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
            totalCount: meta.totalCount,
        items: blogs.map(
            (blog): BlogViewModel => ({
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            }),
        ),
    };
}
