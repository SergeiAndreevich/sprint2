"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapBlogToViewModel = mapBlogToViewModel;
function mapBlogToViewModel(blog) {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
}
