"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRepo = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const email_validator_1 = require("email-validator");
const mapUserToOutput_helper_1 = require("../../Users/helpers/mapUserToOutput.helper");
exports.queryRepo = {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield mongo_db_1.blogsCollection.find().toArray();
            const allPosts = yield mongo_db_1.postsCollection.find().toArray();
            const allUsers = yield mongo_db_1.usersCollection.find().toArray();
            const response = { posts: allPosts, blogs: allBlogs, users: allUsers };
            return response;
        });
    },
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield mongo_db_1.blogsCollection.find().toArray();
            return allBlogs;
        });
    },
    findBlogsByCriteria(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("queryDto:", queryDto);
            const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm //это фигурирует только из BlogsQueryInput
             } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchNameTerm) {
                filter.name = { $regex: searchNameTerm, $options: 'i' };
            }
            console.log("filter:", filter);
            const items = yield mongo_db_1.blogsCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                // .sort({ name: 1 })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.blogsCollection.countDocuments(filter);
            return { items, totalCount };
        });
    },
    findPostsForSpecificBlog(blogId, queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = { blogId: blogId }; // Добавляем фильтр по blogId
            const items = yield mongo_db_1.postsCollection
                .find(filter) // Используем фильтр для выбора постов по blogId
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments(filter); // Считаем только посты с нужным blogId
            return { items, totalCount };
        });
    },
    findBlogByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const found = localDB.blogs.find(blog => blog.id == id);
            const found = yield mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!found) {
                //console.log(id,'blog not found')
                throw new Error('blog not found');
            }
            return found;
        });
    },
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield mongo_db_1.postsCollection.find().toArray();
            return allPosts;
        });
    },
    findPostByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!found) {
                throw new Error('post not found');
            }
            return found;
        });
    },
    findPostsByCriteria(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, searchPostNameTerm } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchPostNameTerm) {
                filter.name = { $regex: searchPostNameTerm, $options: 'i' };
            }
            const items = yield mongo_db_1.postsCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments(filter);
            return { items, totalCount };
        });
    },
    checkAuthInfo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            //нужно как-то определить, что пришло: логин или email
            //затем проверить, есть ли такое в БД (скорее всего тут используется bcrypt)
            //аналогично проверяем исть ли пароль
            // если оба true - возвращаем в answer true
            const { loginOrEmail, password } = input;
            let user;
            if ((0, email_validator_1.validate)(loginOrEmail)) {
                // Ищем пользователя по email
                user = yield mongo_db_1.usersCollection.findOne({ email: loginOrEmail });
            }
            else {
                // Ищем пользователя по логину
                user = yield mongo_db_1.usersCollection.findOne({ login: loginOrEmail });
            }
            if (!user) {
                // Пользователь не найден
                return false;
            }
            console.log('user', user);
            //сравниваем хэш пароля
            // const matchedPassword = await bcrypt.compare(password, user.password)
            // if(!matchedPassword){
            //     return false
            // }
            return true;
        });
    },
    findUserByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield mongo_db_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!found) {
                throw new Error('post not found');
            }
            const userToOutput = (0, mapUserToOutput_helper_1.mapUserToOutput)(found);
            return userToOutput;
        });
    },
    findUsersListByCriteria(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm } = dto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchLoginTerm) {
                filter.login = { $regex: searchLoginTerm, $options: 'i' };
            }
            if (searchEmailTerm) {
                filter.email = { $regex: searchEmailTerm, $options: 'i' };
            }
            const items = yield mongo_db_1.usersCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.usersCollection.countDocuments(filter);
            const usersToView = {
                pagesCount: Math.ceil(totalCount / pageSize),
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: items.map((item) => (0, mapUserToOutput_helper_1.mapUserToOutput)(item))
            };
            return usersToView;
        });
    }
};
