import { NoteFunction } from "../types.ts";
import { delay, input } from "../utils.ts";
import Manager from "../database/Manager.ts";
import router from "../index.ts";

export default {
    name: "delete",
    /**
     * Функция для удаления заметки из дб
     */
    async exec() {
        console.clear();

        const notes = await Manager.GetAll();
        //вывод заголовков с порядковым номером
        console.log(notes.map((note, index) => {
            return `[${++index}] ${note.title}`;
        }).join("\n"));

        console.log();
        console.log("[0] Вернуться назад");
        console.log();
        console.log("Выберите заметку, которую хотите удалить");
        console.log();

        const num = +(await input(">>> "));
        const note = notes[num - 1];

        if(!note && num) {
            console.log();
            console.log("Выбранная вами заметка не существует!");

            await delay(2000);

            router.route();
            return;
        }

        if(!num) {
            router.route();
            return;
        }

        await Manager.Delete({
            title: note.title,
            content: note.content
        });

        console.log("Заметка успешно удалена!");

        await delay(2000);

        router.route();
    }
} as NoteFunction;