import express from "express";
import {setupApp} from "../../src/setup-app";
import {PostInputModel} from "../../src/Posts/dto/post-input-model";
import {ValidationErrorsStore} from "../../src/core/validation/ValidationErrors";
import {createAuthorizationToken} from "../../src/authorization/createTokenForTests";
import {runDB} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/db.settings";
import request from "supertest";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {PATH} from "../../src/core/path/path";
import {UserInputModel} from "../../src/Users/userInputModel";

describe('test users', ()=> {
    const app = express();
    setupApp(app);

    const invalidPostSet: UserInputModel = {
        login: '',
        password: '',
        email: ''
    };
    let errorsBody: ValidationErrorsStore;
    const token = createAuthorizationToken();
    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    afterAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    })
    it('should not create a new user', async () => {
        const res = await request(app).post(PATH.users).set('Authorization', token).send(invalidPostSet).expect(httpStatus.BadRequest);
        errorsBody = res.body;
        //console.log('Errors body',errorsBody);
        expect(errorsBody.errorsMessages.length).toBe(3);

        const users = await request(app).get(PATH.users).set('Authorization', token).expect(httpStatus.Ok);
        //expect(users.body.items.length).toBe(0)
    });
})