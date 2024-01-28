import { NoteFunction } from "../types.ts";
import { input } from "../utils.ts";


export default {
    name: "start",
    /**
     * Функция для запуска и получения действия от пользователя
     */
    async exec() {
        console.clear();
        console.log('[    ГЛАВНОЕ МЕНЮ    ]');
        console.log();
        console.log('Выберите действие:');
        console.log('[1] Добавление новой заметки');
        console.log('[2] Просмотр списка всех заметок');
        console.log('[3] Поиск заметки');
        console.log('[4] Удаление заметки');
        console.log();

        return +(await input(">>> "));
    }
} as NoteFunction;