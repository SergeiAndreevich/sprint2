import {WithId} from "mongodb";
import {Blog} from "../Blog";
import {BlogViewModel} from "../dto/blog-view-model";

export function mapBlogToViewModel(blog: WithId<Blog>): BlogViewModel {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}