import express from "express";
import {setupApp} from "../../src/setup-app";
import {createAuthorizationToken} from "../../src/authorization/createTokenForTests";
import {runDB} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/db.settings";
import request from "supertest";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {UserInputModel} from "../../src/Users/userInputModel";
import {PATH} from "../../src/core/path/path";

describe('test users', ()=> {
    const app = express();
    setupApp(app);

    const testUser: UserInputModel = {
        login: 'qwerty',
        password: '123456',
        email: 'qwerty@mail.ru'
    };
    const token = createAuthorizationToken();
    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    afterAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    })
    it('creates a new user', async () => {
        //const newUser = await request(app).post(PATH.users).set('Authorization', token).send(testUser).expect(httpStatus.Created);
        const newUser2 = await request(app).post(PATH.users).set('Authorization', token).send({login: 'qwert',
            password: '123456',email: 'qwert@mail.ru'}).expect(httpStatus.Created);
        //console.log('NewUser2',newUser2.body);
        const usersList = await request(app).get('/users').set('Authorization', token).expect(httpStatus.Ok);
        //console.log(usersList.body);
        //expect(newUser.body.password !== newUser2.body.password);

        //console.log(usersList.body);
        const userId = usersList.body.items[0].id;
        await request(app).delete(`${PATH.users}/${userId}`).set('Authorization', token).expect(httpStatus.NoContent);
        const newUsersList = await request(app).get('/users').set('Authorization', token).expect(httpStatus.Ok);
        expect(usersList.body.length === newUsersList.body.length-1);
    });
})