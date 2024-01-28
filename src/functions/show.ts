import { NoteFunction } from "../types.ts";
import { delay, getSelectedFrom, logNoteData } from "../utils.ts";
import Manager from "../database/Manager.ts";
import router from "../index.ts";


export default {
    name: "show",
    /**
     * Функция для просмотра списка всех заметок
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

        const note = await getSelectedFrom(notes);

        if(!note) return;

        logNoteData(note);

        await delay(7000);
        
        router.route();
    }
} as NoteFunction;