"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routers/blogs.router");
const path_1 = require("./core/path/path");
const posts_router_1 = require("./routers/posts.router");
const testing_router_1 = require("./routers/testing.router");
const auth_router_1 = require("./routers/auth.router");
const users_router_1 = require("./routers/users.router");
const comments_router_1 = require("./routers/comments.router");
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    app.get('/', (req, res) => {
        res.status(200).send(`go to ${path_1.PATH.docs}`);
    });
    app.use(path_1.PATH.blogs, blogs_router_1.blogsRouter);
    app.use(path_1.PATH.posts, posts_router_1.postsRouter);
    app.use(path_1.PATH.testing, testing_router_1.testingRouter);
    app.use(path_1.PATH.auth, auth_router_1.authRouter);
    app.use(path_1.PATH.users, users_router_1.usersRouter);
    app.use(path_1.PATH.comments, comments_router_1.commentsRouter);
    //setupSwagger(app);
    return app;
};
exports.setupApp = setupApp;
//
