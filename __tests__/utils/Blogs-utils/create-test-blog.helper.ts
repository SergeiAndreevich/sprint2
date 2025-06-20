// @ts-ignore
import request from "supertest";
import {Express} from "express";
import {BlogInputModel} from "../../../src/Blogs/dto/blog-input-model";
import {BlogViewModel} from "../../../src/Blogs/dto/blog-view-model";
import {PATH} from "../../../src/core/path/path";
import {createAuthorizationToken} from "../../../src/authorization/createTokenForTests";
import {httpStatus} from "../../../src/core/core-types/http-statuses";


export async function createTestBlog(app: Express, blog?: BlogInputModel): Promise<BlogViewModel> {
    const defaultBlog:BlogInputModel = {
        name: "Test Blog",
        description: "Test Blog description",
        websiteUrl: "http://localhost.ru"
    };

    const testBlog = {...defaultBlog, ...blog};

    const createdBlogResponse = await request(app).post(PATH.blogs)
        .set('Authorization', createAuthorizationToken()).send(testBlog). expect(httpStatus.Created)
    return createdBlogResponse.body
}

// export async function createDriver(
//     app: Express,
//     driverDto?: DriverInputDto,
// ): Promise<DriverViewModel> {
//     const defaultDriverData: DriverInputDto = getDriverDto();
//
//     const testDriverData = { ...defaultDriverData, ...driverDto };
//
//     const createdDriverResponse = await request(app)
//         .post(DRIVERS_PATH)
//         .set('Authorization', generateBasicAuthToken())
//         .send(testDriverData)
//         .expect(HttpStatus.Created);
//
//     return createdDriverResponse.body;
// }