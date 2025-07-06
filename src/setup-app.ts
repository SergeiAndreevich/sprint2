import express, { Express, Request,Response } from "express";
import {blogsRouter} from "./routers/blogs.router";
import {PATH} from "./core/path/path";
import {postsRouter} from "./routers/posts.router";
import {testingRouter} from "./routers/testing.router";
import {authRouter} from "./routers/auth.router";
import {usersRouter} from "./routers/users.router";
import {commentsRouter} from "./routers/comments.router";


export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send(`go to ${PATH.docs}`);
    });


    app.use(PATH.blogs,blogsRouter);
    app.use(PATH.posts,postsRouter);
    app.use(PATH.testing,testingRouter);
    app.use(PATH.auth, authRouter);
    app.use(PATH.users, usersRouter);
    app.use(PATH.comments, commentsRouter)
    //setupSwagger(app);
    return app;
};
//
