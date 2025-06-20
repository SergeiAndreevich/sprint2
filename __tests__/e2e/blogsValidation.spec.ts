// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from 'express';
//import {describe} from "node:test"; -------------------------------------------- Обрати вниманию сюда!!!!!!
// эта хрень забрала у тебя несколько часов жизни, неоднократно. Не наступай на одни и те же грабли! Проверяй и удаляй!
import {setupApp} from "../../src/setup-app";
import {BlogInputModel} from "../../src/Blogs/dto/blog-input-model";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {PATH} from "../../src/core/path/path";
import {createAuthorizationToken} from "../../src/authorization/createTokenForTests";
import {runDB} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/db.settings";
import {createTestBlog} from "../utils/Blogs-utils/create-test-blog.helper";
import {ValidationErrorsStore} from "../../src/core/validation/ValidationErrors";

describe('test blogs', ()=>{
    const app = express();
    setupApp(app);

    const invalidBlogSet: BlogInputModel = {
        name: "",
        description: "",
        websiteUrl: "http://localhost"
    };
    let errorsBody : ValidationErrorsStore;
    const token = createAuthorizationToken();
    beforeAll(async () => {
        //законектились к БД и почистили ее вначале
        await runDB(SETTINGS.MONGO_URL);
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    afterAll(async () => {
        //убрали всё за собой по окончании тестов
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    })
    it('should be unauthorized', async () => {
        await request(app).post(PATH.blogs).send({name: "test",  description: "test",   websiteUrl: "http://localhost.ru"}).expect(httpStatus.Unauthorized);
    })
    it('should not create a new blog', async () => {
        //const validResponse = await request(app).post(PATH.blogs).set('Authorization', token).send({name: "test", description: "test",  websiteUrl: "http://localhost.ru"});
        const res = await request(app).post(PATH.blogs).set('Authorization', token).send({...invalidBlogSet, name: '', description: '', websiteUrl:''}).expect(httpStatus.BadRequest);
        errorsBody = res.body;
        expect(errorsBody.errorsMessages).toHaveLength(3);  //теперь комментарий ниже не работает, тк мы поставили флаг only first error, то есть сколько ошибочных полей
        //столько и ошибок. Теперь пусть в url лежить хоть 1000 ошибок, будет выдавать только первую
        //если написать res.body.errorMessages, то выдаст массив с ошибками. Здесь в url лежит 2 ошибки (длина и isURL)
        const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        //console.log(blogs)
        expect(blogs.body.items.length).toBe(0)
    });

    it('should not create blog',  async () => {
        const res = await request(app).post(PATH.blogs).set('Authorization', token).send(invalidBlogSet).expect(httpStatus.BadRequest);
        const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        expect(blogs.body.length === 0);
        errorsBody = res.body;
        expect(errorsBody.errorsMessages.length).toBe(3);
    });
    it('should not create blog',  async () => {
        const res = await request(app).post(PATH.blogs).set('Authorization', token).send({...invalidBlogSet, name: '    ', description: '    ', websiteUrl: '    '}).expect(httpStatus.BadRequest)
        errorsBody = res.body;
        expect(errorsBody.errorsMessages.length).toBe(3);
    })
    it('should not create blog',  async () => {
        const res = await request(app).post(PATH.blogs).set('Authorization', token).send({...invalidBlogSet, name: 1, description: 2, websiteUrl: 3}).expect(httpStatus.BadRequest);
        errorsBody = res.body;
        expect(errorsBody.errorsMessages.length).toBe(3)
    })
    it('should not change blog',  async () => {
        const createdBlog = await createTestBlog(app, {name: 'Blog', description:'description', websiteUrl:'http://localhost.ru'});
        //const blog = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        const res = await request(app).put(`${PATH.blogs}/${createdBlog.id}`).set('Authorization', token).send(invalidBlogSet).expect(httpStatus.BadRequest);
        errorsBody = res.body;
        expect(errorsBody.errorsMessages.length).toBe(3)
    })
    it('should not change blog',  async () => {
        const createdBlog = await createTestBlog(app, {name: 'Blog', description:'description', websiteUrl:'http://localhost.ru'});
        //const blog = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        const res = await request(app).put(`${PATH.blogs}/${createdBlog.id}`).set('Authorization', token).send({name: '', description: '', websiteUrl: ''}).expect(httpStatus.BadRequest);
        errorsBody = res.body;
        expect(errorsBody.errorsMessages.length).toBe(3)
    })
    it('should not change blog',  async () => {
        const createdBlog = await createTestBlog(app, {name: 'Blog', description:'description', websiteUrl:'http://localhost.ru'});
        //const blog = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        const res = await request(app).put(`${PATH.blogs}/${createdBlog.id}`).set('Authorization', token).send({name: 1, description: 2, websiteUrl: 3}).expect(httpStatus.BadRequest);
        errorsBody = res.body;
        expect(errorsBody.errorsMessages.length).toBe(3)
        // теперь 3, читай комментарий выше //5 потому что имя не строка, описание не строка, сайт не строка, короче 11 и не url
    })
})