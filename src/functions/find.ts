import { Note, NoteFunction } from "../types.ts";
import { delay, getSelectedFrom, input, logNoteData } from "../utils.ts";
import Manager from "../database/Manager.ts";
import router from "../index.ts";


export default {
    name: "find",
    /**
     * Функция для поиска заметок
     */
    async exec() {
        console.clear();
        console.log("Введите ключевое слово или фразу, содержащуюся в заметке");
        console.log();

        const keyword = await input(">>> ");
        const regex = new RegExp(keyword, "i");
        const notes = await Manager.GetWhere({
            $or: [
                { 
                    title: regex
                }, 
                {
                    content: regex
                }
            ]
        });

        if(!notes.length) {
            console.log("Совпадений не найдено");
            
            await delay(3000);

            router.route();
            return;
        }
        
        // вывод списка заметок, содержащих ключевое слово
        console.log();
        console.log(notes.map((note, index) => {
            return `[${++index}] ${note.title}`
        }).join("\n"));

        console.log();
        console.log("[0] Вернуться назад");
        console.log();

        const note = await getSelectedFrom(notes as Array<Note>);

        if(!note) return;

        logNoteData(note);

        await delay(7000);

        router.route();
    }
} as NoteFunction;