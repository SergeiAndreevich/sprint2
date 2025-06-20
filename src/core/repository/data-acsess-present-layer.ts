import {ObjectId, WithId} from "mongodb";
import {Blog} from "../../Blogs/Blog";
import {blogsCollection, postsCollection} from "../../db/mongo.db";
import {Post} from "../../Posts/Post";
import {BlogSortsFields, PaginationAndSorting, PostsSortFields} from "../core-types/pagination-and-sorting";
import {PostsQueryInput} from "../../Posts/dto/posts-query-input-model";
import {param} from "express-validator";

export const queryRepo ={
    async findAll(): Promise<{}> {
        const allBlogs = await blogsCollection.find().toArray();
        const allPosts = await postsCollection.find().toArray();
        const response = {posts: allPosts, blogs: allBlogs};
        return response
    },
    async findAllBlogs(): Promise<WithId<Blog>[]>{
        const allBlogs = await blogsCollection.find().toArray();
        return allBlogs
    },
    async findBlogsByCriteria(queryDto:PaginationAndSorting<BlogSortsFields>):Promise<{items:WithId<Blog>[], totalCount: number}>{
        console.log("queryDto:", queryDto);
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm   //это фигурирует только из BlogsQueryInput
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }
        console.log("filter:", filter);
        const items = await blogsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            // .sort({ name: 1 })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await blogsCollection.countDocuments(filter);
    return { items, totalCount }
},
    async findPostsForSpecificBlog(blogId:string, queryDto:PaginationAndSorting<PostsSortFields>): Promise<{items:WithId<Post>[], totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = { blogId: blogId }; // Добавляем фильтр по blogId
        const items = await postsCollection
            .find(filter)  // Используем фильтр для выбора постов по blogId
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postsCollection.countDocuments(filter); // Считаем только посты с нужным blogId
        return { items, totalCount }
    },
    async findBlogByIdOrFail (id:string): Promise<WithId<Blog>> {
        //const found = localDB.blogs.find(blog => blog.id == id);
        const found = await blogsCollection.findOne({ _id: new ObjectId(id) });
        if(!found){
            //console.log(id,'blog not found')
            throw new Error('blog not found');
        }
        return found
    },
    async findAllPosts():  Promise<WithId<Post>[]> {
        const allPosts = await postsCollection.find().toArray();
        return allPosts
    },
    async findPostByIdOrFail(id:string): Promise<WithId<Post>> {
        const found = await  postsCollection.findOne({_id: new ObjectId(id)});
        if(!found){
            throw new Error('post not found');
        }
        return found
    },
    async findPostsByCriteria(queryDto:PostsQueryInput):Promise<{items:WithId<Post>[], totalCount: number}>{
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchPostNameTerm
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchPostNameTerm) {
            filter.name = { $regex: searchPostNameTerm, $options: 'i' };
        }

        const items = await postsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await postsCollection.countDocuments(filter);
        return { items, totalCount }
    }
}