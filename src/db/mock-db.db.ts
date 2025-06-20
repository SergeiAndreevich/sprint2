import {Blog} from "../Blogs/Blog";
import {Post} from "../Posts/Post";

export const localDB = {
    blogs: <Blog[]>[{
        name: "Fist name",
        description: "First description",
        websiteUrl: "First URL"
    },
    {
        name: "Second name",
        description: "Second description",
        websiteUrl: "Second URL"
    }
    ],
    posts: <Post[]>[{
        title: "First post title",
        shortDescription: "First short description",
        content: "Some first content",
        blogId:	"1",
        blogName: "First blog name"
    }]
}