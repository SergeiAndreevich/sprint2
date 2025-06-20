import {WithoutId} from "mongodb";
import {PostViewModel} from "../../../src/Posts/dto/post-view-model";
import {Express} from "express";
// @ts-ignore
import request from "supertest";
import {PATH} from "../../../src/core/path/path";
import {httpStatus} from "../../../src/core/core-types/http-statuses";

export async function findPostById(app: Express, id: string): Promise<WithoutId<PostViewModel>> {
    const post = await request(app).get(`${PATH.posts}/${id}`).expect(httpStatus.Ok);
    return  post.body
}