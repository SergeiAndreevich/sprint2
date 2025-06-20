// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from 'express';
import {setupApp} from "../../src/setup-app";
import {BlogInputModel} from "../../src/Blogs/dto/blog-input-model";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {PATH} from "../../src/core/path/path";
import {PostInputModel} from "../../src/Posts/dto/post-input-model";
import {createAuthorizationToken} from "../../src/authorization/createTokenForTests";
import {runDB} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/db.settings";
import {ValidationErrorsStore} from "../../src/core/validation/ValidationErrors";

describe('test posts', ()=>{
    const app = express();
    setupApp(app);

    const invalidPostSet: PostInputModel = {
        title: "",
        shortDescription: "",
        content: "",
        blogId: ""
    };
    let errorsBody : ValidationErrorsStore;
    const token = createAuthorizationToken();
    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    afterAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    })
    it('should not create a new post', async () => {
        const res = await request(app).post(PATH.posts).set('Authorization', token).send(invalidPostSet).expect(httpStatus.BadRequest);
        errorsBody =  res.body;
        expect(errorsBody.errorsMessages.length).toBe(4);
        //теперь не будет 2 шт, тк только первую ошибку выдаем. Одно поле - первая ошибка, даже если их в этом поле сто штук.
        // 2 шт получается в blodId из-за того что пустой и не нумерик стринг
        const post = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(post.body.length).toBe(0)
    });
    it('should not create a new post', async () => {
        const res = await request(app).post(PATH.posts).set('Authorization', token).send({...invalidPostSet, title: '    b   b   ', shortDescription: '    a', content: 'b   ', blogId: 'a'})
            .expect(httpStatus.BadRequest);
        errorsBody=res.body;
        expect(errorsBody.errorsMessages.length).toBe(1)
    });
    it('should not create a new post', async () => {
        const res = await request(app).post(PATH.posts).set('Authorization', token).send({...invalidPostSet,  title:1, shortDescription:2, content:3, blogId:4}).expect(httpStatus.BadRequest);
        errorsBody=res.body;
        expect(errorsBody.errorsMessages.length).toBe(4)
    })

})