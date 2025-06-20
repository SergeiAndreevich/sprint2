import {localDB} from "../../db/mock-db.db";
import {Blog} from "../../Blogs/Blog";
import {BlogInputModel} from "../../Blogs/dto/blog-input-model";
import {Post} from "../../Posts/Post";
import {PostInputModel} from "../../Posts/dto/post-input-model";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection, postsCollection} from "../../db/mongo.db";
import allPresets from "ts-jest/presets";

export const repository = {
    async createNewBlog(newBlog:Blog): Promise<string>{
        const insertedOne = await blogsCollection.insertOne(newBlog);
        return insertedOne.insertedId.toString()
    },
    async removeBlogById(id:string): Promise<void>{
        //const index = localDB.blogs.findIndex((v) => v.id === id);
        const deletedOne = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
        if (deletedOne.deletedCount < 1) {
            throw new Error('Blog does not exist');
        }
        return
    },
    async removeAll(): Promise<void> {
        await blogsCollection.deleteMany({});
        await postsCollection.deleteMany({});
        return
    },
    async updateBlog(id: string, newBlog:BlogInputModel): Promise<void> {
        const updatedOne = await blogsCollection.updateOne({ _id: new ObjectId(id) },
            {
                $set: {
                    name: newBlog.name,
                    description: newBlog.description,
                    websiteUrl: newBlog.websiteUrl
                }
            });
        if(updatedOne.matchedCount < 1){
            throw new Error('Blog does not exist');
        }
        return
    },
    async createNewPost(post: Post): Promise<string> {
        const newPost = await postsCollection.insertOne(post);
        return newPost.insertedId.toString()
    },
    async updatePost(id:string, newPost:PostInputModel):Promise<void>{
        const updatedOne = await postsCollection.updateOne({_id: new ObjectId(id)},{
            $set: {
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId
            }
        });
        if(updatedOne.matchedCount < 1){
            throw new Error('Blog does not exist');
        }
        return
    },
    async removePostById(id:string): Promise<void> {
        const deletedOne = await postsCollection.deleteOne({ _id: new ObjectId(id) });
        if (deletedOne.deletedCount < 1) {
            throw new Error('Blog does not exist');
        }
        return
    }
}