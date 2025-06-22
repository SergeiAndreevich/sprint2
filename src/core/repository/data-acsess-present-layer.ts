import {ObjectId, WithId} from "mongodb";
import {Blog} from "../../Blogs/Blog";
import {blogsCollection, postsCollection, usersCollection} from "../../db/mongo.db";
import {Post} from "../../Posts/Post";
import {
    BlogSortsFields,
    PaginationAndSorting,
    PostsSortFields,
    UsersSortFields
} from "../core-types/pagination-and-sorting";
import {PostsQueryInput} from "../../Posts/dto/posts-query-input-model";
import {LoginInputModel} from "../../authorization/LoginInputModel";
import {validate} from "email-validator";
import {User} from "../../Users/User";
import {UserViewModel} from "../../Users/UserViewModel";
import {mapUserToOutput} from "../../Users/helpers/mapUserToOutput.helper";
import {PaginationUsersViewModel} from "../core-types/pagination-view-models";
import bcrypt from "bcrypt";

export const queryRepo ={
    async findAll(): Promise<{}> {
        const allBlogs = await blogsCollection.find().toArray();
        const allPosts = await postsCollection.find().toArray();
        const allUsers = await usersCollection.find().toArray();
        const response = {posts: allPosts, blogs: allBlogs, users: allUsers};
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
    },
    async checkAuthInfo(input: LoginInputModel):Promise<boolean> {
        //нужно как-то определить, что пришло: логин или email
        //затем проверить, есть ли такое в БД (скорее всего тут используется bcrypt)
        //аналогично проверяем исть ли пароль
        // если оба true - возвращаем в answer true
        const {loginOrEmail, password} = input;
        // let user;
        //
        // if (validate(loginOrEmail)) {
        //     // Ищем пользователя по email
        //     user = await usersCollection.findOne({ email: loginOrEmail });
        // } else {
        //     // Ищем пользователя по логину
        //     user = await usersCollection.findOne({ login: loginOrEmail });
        // }
        // if (!user) {
        //     // Пользователь не найден
        //     return false
        // }
        // console.log('user', user)
        const user = await usersCollection.findOne({$or : [{login: loginOrEmail}, {email: loginOrEmail}]});
        if(!user){
            return false
        }
        //сравниваем хэш пароля
        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            return false
        }
        return true
    },
    async findUserByIdOrFail(id: string):Promise<UserViewModel> {
        const found = await  usersCollection.findOne({_id: new ObjectId(id)});
        if(!found){
            throw new Error('post not found');
        }
        const userToOutput = mapUserToOutput(found);
        return userToOutput
    },
    async findUsersListByCriteria(dto:PaginationAndSorting<UsersSortFields>):Promise<PaginationUsersViewModel>{
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchLoginTerm,
            searchEmailTerm
        } = dto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchLoginTerm) {
            filter.login = { $regex: searchLoginTerm, $options: 'i' };
        }
        if (searchEmailTerm) {
            filter.email = { $regex: searchEmailTerm, $options: 'i' };
        }

        const items = await usersCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await usersCollection.countDocuments(filter);
        const usersToView = {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: items.map((item: WithId<User>) => mapUserToOutput(item))
        }
        return usersToView
    }
}