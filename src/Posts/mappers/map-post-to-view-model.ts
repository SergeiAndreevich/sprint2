import {WithId} from "mongodb";
import {Post} from "../Post";

export function mapPostToViewModel(post: WithId<Post>) {
    return{
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt.toISOString()
    }
}