"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPostToViewModel = mapPostToViewModel;
function mapPostToViewModel(post) {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt.toISOString()
    };
}
