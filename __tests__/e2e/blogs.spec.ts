// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from "express";
import {setupApp} from "../../src/setup-app";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {PATH} from "../../src/core/path/path";
import {BlogInputModel} from "../../src/Blogs/dto/blog-input-model";
import {createAuthorizationToken} from "../../src/authorization/createTokenForTests";
import {runDB} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/db.settings";
import {beforeEach} from "node:test";
import {createTestBlog} from "../utils/Blogs-utils/create-test-blog.helper";
import {findBlogById} from "../utils/Blogs-utils/find-test-blog-by-id.helper";
import {changeTestBlog} from "../utils/Blogs-utils/change-test-blogs.helper";

describe('test blogs', ()=>{
    const app = express();
    setupApp(app);

    // const token = createAuthorizationToken();
    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    // beforeEach(async () => {
    //     await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    // });
    afterAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    })
    it('creates a new blog', async () => {
        // await request(app).post(PATH.blogs).set('Authorization', token).send(testBlog).expect(httpStatus.Created);
        await createTestBlog(app)
    });
    it('find all blogs', async () => {
        await createTestBlog(app)
        const blogs = await request(app).get(PATH.blogs).set('Authorization', createAuthorizationToken()).expect(httpStatus.Ok);
        //console.log(blogs.body);
        expect(blogs.body).toBeInstanceOf(Object);
        expect(blogs.body.items.length).toBeGreaterThanOrEqual(1);
    });
    it('find blog by id', async () => {
        const createdBlog = await createTestBlog(app);
        const blog = await findBlogById(app,  createdBlog.id);

        expect(blog).toEqual({
            ...createdBlog,
            id: expect.any(String),
            createdAt: expect.any(String),
        });
    })
    it('should change blog by id',  async () => {
        // создали блог
        const createdBlog = await  createTestBlog(app);
        // получили все блоги
        //const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        // получили наш созданный блог
        //const blog1 = await findBlogById(app,createdBlog.id);
        //const blog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);

        // изменили наш созданный блог
        //await request(app).put(`${PATH.blogs}/${blogs.body[0].id}`).set('Authorization', token).send({...testBlog,name:"Changed name"}).expect(httpStatus.NoContent);
        //const changedBlog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);
        //expect(blog.body.name !== changedBlog.body.name)
        const updateData: BlogInputModel = {
            name: "new name",
            description: "new description",
            websiteUrl: "https://asd.ru"
        };
        await changeTestBlog(app, createdBlog.id, updateData)
        const blogResponse = await findBlogById(app, createdBlog.id);

        expect(blogResponse).toEqual({
            id: createdBlog.id,
            name: updateData.name,
            description: updateData.description,
            websiteUrl: updateData.websiteUrl,
            createdAt: expect.any(String),
            isMembership: expect.any(Boolean)
        });

    });
    it('should remove blog by id',  async () => {
        const blog = await createTestBlog(app);
        // const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        // expect(blogs.body).toBeInstanceOf(Array);
        // expect(blogs.body.length === 2);
        // const blog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);
        // const blog2 = await request(app).get(`${PATH.blogs}/${blogs.body[1].id}`).expect(httpStatus.Ok);
        // await request(app).delete(`${PATH.blogs}/${blogs.body[0].id}`).set('Authorization', token).expect(httpStatus.NoContent);
        // const newBlogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        // expect(newBlogs.body.length === 1);
        // expect(newBlogs.body[0].id !== blog.body.id);
        // expect(newBlogs.body[0].id === blog2.body.id)
        await request(app)
            .delete(`${PATH.blogs}/${blog.id}`)
            .set('Authorization', createAuthorizationToken())
            .expect(httpStatus.NoContent);

        await request(app)
            .get(`${PATH.blogs}/${blog.id}`)
            .set('Authorization', createAuthorizationToken())
            .expect(httpStatus.NotFound);
    });
    // it('GET -> "blogs": should return status 200; content: blog array with pagination; used additional methods: POST -> /blogs, GET -> /blogs', async () => {
    //     const blog = await createTestBlog(app);
    //     await request(app)
    //         .get(`${PATH.blogs}`).expect(httpStatus.Ok);
    //
    //     expect(blog).toEqual()
    // })
})