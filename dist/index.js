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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const db_settings_1 = require("./core/settings/db.settings");
const mongo_db_1 = require("./db/mongo.db");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // создание приложения
        const app = (0, express_1.default)();
        (0, setup_app_1.setupApp)(app);
        // порт приложения
        const PORT = process.env.PORT || db_settings_1.SETTINGS.PORT;
        //подключаем к проекту БД (тк мы обращаемся на сервер и требуется подождать ответ, то оборачиваем в async/await)
        yield (0, mongo_db_1.runDB)(db_settings_1.SETTINGS.MONGO_URL);
        //* тк у нас появилась БД на удаленном сервере, то и все запросы на неё требуется обернуть в async/await *//
        // запуск приложения
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    });
}
main();
