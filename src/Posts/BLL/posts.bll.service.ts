import {repository} from "../../core/repository/data-acsess-layer";
import {PostInputModel} from "../dto/post-input-model";
import {Post} from "../Post";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";

export const postsService = {
    async createNewPost(post: PostInputModel): Promise<string> {
        const blogInfo = await queryRepo.findBlogByIdOrFail(post.blogId);
        const newPost:Post = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blogInfo._id.toString(),
            blogName: blogInfo.name,
            createdAt: new Date()
        };
        return await repository.createNewPost(newPost);
    },
    async removePostById(id: string): Promise<void> {
        await repository.removePostById(id);
        return
    },
    async updatePostById(id: string, body:PostInputModel): Promise<void> {
        await repository.updatePost(id, body);
        return
    }
}