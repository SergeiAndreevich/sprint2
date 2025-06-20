import {Express} from "express";
import {PostInputModel} from "../../../src/Posts/dto/post-input-model";
import {PostViewModel} from "../../../src/Posts/dto/post-view-model";
// @ts-ignore
import request from "supertest";
import {PATH} from "../../../src/core/path/path";
import {createAuthorizationToken} from "../../../src/authorization/createTokenForTests";
import {httpStatus} from "../../../src/core/core-types/http-statuses";
import {createTestBlog} from "../Blogs-utils/create-test-blog.helper";
import {findBlogById} from "../Blogs-utils/find-test-blog-by-id.helper";

export async function createTestPost(app: Express, data?: PostInputModel):Promise<PostViewModel>{
    const createdBlog = await createTestBlog(app);
    const defaultPost: PostInputModel = {
        title: 'Test post title',
        shortDescription: 'Test post short description',
        content: 'Test post content',
        blogId: createdBlog.id
    }
    const createdPost = await request(app).post(PATH.posts).set('Authorization', createAuthorizationToken())
        .send({...defaultPost, ...data}).expect(httpStatus.Created);
    return createdPost.body
}