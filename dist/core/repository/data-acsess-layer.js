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
exports.repository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const bcryptAdapter_adapter_1 = require("../../adapters/bcryptAdapter.adapter");
const mapUserToOutput_helper_1 = require("../../Users/helpers/mapUserToOutput.helper");
const ResultObject_model_1 = require("../core-types/ResultObject.model");
exports.repository = {
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedOne = yield mongo_db_1.blogsCollection.insertOne(newBlog);
            return insertedOne.insertedId.toString();
        });
    },
    removeBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const index = localDB.blogs.findIndex((v) => v.id === id);
            const deletedOne = yield mongo_db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedOne.deletedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.blogsCollection.deleteMany({});
            yield mongo_db_1.postsCollection.deleteMany({});
            yield mongo_db_1.usersCollection.deleteMany({});
            return;
        });
    },
    updateBlog(id, newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOne = yield mongo_db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: newBlog.name,
                    description: newBlog.description,
                    websiteUrl: newBlog.websiteUrl
                }
            });
            if (updatedOne.matchedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    createNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield mongo_db_1.postsCollection.insertOne(post);
            return newPost.insertedId.toString();
        });
    },
    updatePost(id, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOne = yield mongo_db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: newPost.title,
                    shortDescription: newPost.shortDescription,
                    content: newPost.content,
                    blogId: newPost.blogId
                }
            });
            if (updatedOne.matchedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    removePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedOne = yield mongo_db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedOne.deletedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield mongo_db_1.usersCollection.insertOne(user);
            return newUser.insertedId.toString();
        });
    },
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield mongo_db_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedUser.deletedCount < 1) {
                throw new Error('User does not exist');
            }
            return;
        });
    },
    findUserByLoginOrEmail(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongo_db_1.usersCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
            if (!user) {
                return { status: ResultObject_model_1.ResultStatus.NotFound, data: null, error: { field: 'loginOrEmail', message: 'user not found' } };
            }
            const isPasswordCorrect = yield bcryptAdapter_adapter_1.bcryptAdapter.checkPassword(password, user.password);
            if (!isPasswordCorrect) {
                return { status: ResultObject_model_1.ResultStatus.Unauthorized, data: null, error: { field: 'password', message: 'wrong password' } };
            }
            return { status: ResultObject_model_1.ResultStatus.Success, data: (0, mapUserToOutput_helper_1.mapUserToOutput)(user) };
        });
    }
};
