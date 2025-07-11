import {Blog} from "../../Blogs/Blog";
import {BlogInputModel} from "../../Blogs/dto/blog-input-model";
import {Post} from "../../Posts/Post";
import {PostInputModel} from "../../Posts/dto/post-input-model";
import {ObjectId} from "mongodb";
import {blogsCollection, postsCollection, usersCollection} from "../../db/mongo.db";
import {User} from "../../Users/User";
import {UserViewModel} from "../../Users/UserViewModel";
import {bcryptAdapter} from "../../adapters/bcryptAdapter.adapter";
import {mapUserToOutput} from "../../Users/helpers/mapUserToOutput.helper";
import {Result, ResultStatus} from "../core-types/ResultObject.model";

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
        await usersCollection.deleteMany({});
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
    },
    async createNewUser(user: User): Promise<string> {
        const newUser = await usersCollection.insertOne(user);
        return newUser.insertedId.toString()
    },
    async removeUser(id:string): Promise<void> {
        const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
        if (deletedUser.deletedCount < 1) {
            throw new Error('User does not exist');
        }
        return
    },
    async findUserByLoginOrEmail(loginOrEmail:string, password: string): Promise<Result<UserViewModel | null>> {
        const user = await usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]});
        if (!user) {return {status: ResultStatus.NotFound, data: null, error: {field: 'loginOrEmail', message: 'user not found'}};}
        const isPasswordCorrect = await bcryptAdapter.checkPassword(password, user.password);
        if (!isPasswordCorrect) {return {status: ResultStatus.Unauthorized, data: null, error: {field: 'password', message: 'wrong password'}};}
        return {status: ResultStatus.Success, data:mapUserToOutput(user)}
    }
}