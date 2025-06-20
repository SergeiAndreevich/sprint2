"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsCollection = exports.blogsCollection = exports.client = void 0;
exports.runDB = runDB;
const mongodb_1 = require("mongodb");
const db_settings_1 = require("../core/settings/db.settings");
const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';
//создаем подключение к БД (тк БД мб много, то и url может меняться)
function runDB(url) {
    return __awaiter(this, void 0, void 0, function* () {
        //инициализируем новое подключение к монгошке
        exports.client = new mongodb_1.MongoClient(url);
        //создаем БД с определенным имененм
        const db = exports.client.db(db_settings_1.SETTINGS.DB_NAME);
        //создаем коллекции в этой БД
        exports.blogsCollection = db.collection(BLOGS_COLLECTION_NAME);
        exports.postsCollection = db.collection(POSTS_COLLECTION_NAME);
        //пробный конект с БД, пингуем для проверки
        try {
            yield exports.client.connect();
            yield db.command({ ping: 1 });
            console.log('Connected to database');
        }
        catch (e) {
            yield exports.client.close();
            throw new Error(`new error ${e}`);
        }
    });
}
