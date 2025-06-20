import {localDB} from "../../db/mock-db.db";
import {Blog} from "../../Blogs/Blog";
import {BlogInputModel} from "../../Blogs/dto/blog-input-model";

import {repository} from "../../core/repository/data-acsess-layer";

export const blogsService = {
    async createNewBlog(dto: BlogInputModel): Promise<string>{
        const newBlog:Blog = {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: new Date(),
            isMembership: false
        };
        return await repository.createNewBlog(newBlog)
    },
    async removeBlogById(id:string): Promise<void>{
        //const index = localDB.blogs.findIndex((v) => v.id === id);
        await repository.removeBlogById(id)
        return
    },
    async updateBlog(id: string, newBlog:BlogInputModel): Promise<void> {
        await repository.updateBlog(id, newBlog)
        return
    },
}