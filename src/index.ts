import express from "express";
import {setupApp} from "./setup-app";
import {SETTINGS} from "./core/settings/db.settings";
import {runDB} from "./db/mongo.db";

async function main() {
    // создание приложения
    const app = express();
    setupApp(app);

    // порт приложения
    const PORT = process.env.PORT || SETTINGS.PORT;

    //подключаем к проекту БД (тк мы обращаемся на сервер и требуется подождать ответ, то оборачиваем в async/await)
    await runDB(SETTINGS.MONGO_URL);

    //* тк у нас появилась БД на удаленном сервере, то и все запросы на неё требуется обернуть в async/await *//

    // запуск приложения
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
}

main();
