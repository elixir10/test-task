import { NoteFunction } from "../types.ts";
import { delay, input } from "../utils.ts";
import Manager from "../database/Manager.ts";
import router from "../index.ts";

export default {
    name: "add",
    /**
     * Функция для добавления заметки в дб
     */
    async exec() {
        console.clear();
        console.log("Введите заголовок заметки:");
        console.log();

        const title = await input(">>> ");

        console.log();
        console.log("Введите содержание заметки:");
        console.log();

        const content = await input(">>> ");

        if(!content.length || !title.length) {
            console.log();
            console.log("Данные не были введены!");

            await delay(2000);

            router.route();
            return;
        }

        await Manager.Post({
            title,
            content
        });
        
        console.log();
        console.log("Заметка успешно добавлена!");

        await delay(2000);

        router.route();
    }
} as NoteFunction;