// @ts-ignore
import request from "supertest";
import {BlogViewModel} from "../../../src/Blogs/dto/blog-view-model";
import {Express} from "express";
import {PATH} from "../../../src/core/path/path";
import {httpStatus} from "../../../src/core/core-types/http-statuses";
import {BlogInputModel} from "../../../src/Blogs/dto/blog-input-model";
import {createAuthorizationToken} from "../../../src/authorization/createTokenForTests";


export async function changeTestBlog(app: Express, id: string,newData: BlogInputModel) :Promise<BlogViewModel>{
    const blog = await request(app).get(`${PATH.blogs}/${id}`).expect(httpStatus.Ok);
    const changedBlog = await request(app).put(`${PATH.blogs}/${id}`).set('Authorization', createAuthorizationToken())
        .send(newData).expect(httpStatus.NoContent);
    expect(blog.body.name !== changedBlog.body.name)
    return changedBlog.body
}