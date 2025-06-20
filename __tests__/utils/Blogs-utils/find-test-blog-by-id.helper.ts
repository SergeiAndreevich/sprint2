// @ts-ignore
import request from "supertest";
import {Express} from "express";
import {WithId} from "mongodb";
import {Blog} from "../../../src/Blogs/Blog";
import {PATH} from "../../../src/core/path/path";
import {httpStatus} from "../../../src/core/core-types/http-statuses";

export async function findBlogById(app:Express, id: string):Promise<WithId<Blog>>{
    const blog = await request(app).get(`${PATH.blogs}/${id}`).expect(httpStatus.Ok)
    return blog.body
}