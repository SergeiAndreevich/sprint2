import {Collection, Db, MongoClient} from "mongodb";
import {Blog} from "../Blogs/Blog";
import {Post} from "../Posts/Post";
import {SETTINGS} from "../core/settings/db.settings";

const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';
export let client: MongoClient;
export let blogsCollection: Collection<Blog>;
export let  postsCollection: Collection<Post>;

//создаем подключение к БД (тк БД мб много, то и url может меняться)
export async function runDB(url:string):Promise<void> {
    //инициализируем новое подключение к монгошке
    client = new MongoClient(url);

    //создаем БД с определенным имененм
    const db: Db = client.db(SETTINGS.DB_NAME);

    //создаем коллекции в этой БД
    blogsCollection = db.collection<Blog>(BLOGS_COLLECTION_NAME);
    postsCollection = db.collection<Post>(POSTS_COLLECTION_NAME);

    //пробный конект с БД, пингуем для проверки
    try {
        await client.connect();
        await db.command({ping:1});
        console.log('Connected to database')
    }
    catch (e) {
        await client.close();
        throw new Error(`new error ${e}`)
    }
}