// @ts-ignore
import request from "supertest";
import {Express} from "express";
import {PostInputModel} from "../../../src/Posts/dto/post-input-model";
import {PostViewModel} from "../../../src/Posts/dto/post-view-model";
import {PATH} from "../../../src/core/path/path";
import {httpStatus} from "../../../src/core/core-types/http-statuses";
import {createAuthorizationToken} from "../../../src/authorization/createTokenForTests";

export async function changePostById(app: Express, id: string, newData: PostInputModel): Promise<PostViewModel>{
    const post = await request(app).get(`${PATH.posts}/${id}`).expect(httpStatus.Ok);
    const changedPost = await request(app).put(`${PATH.posts}/${id}`).set('Authorization', createAuthorizationToken())
        .send(newData).expect(httpStatus.NoContent);
    expect(post.body.title !== changedPost.body.title);
    return changedPost.body
}