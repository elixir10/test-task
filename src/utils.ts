import readline from 'readline/promises';
import router from './index.ts';
import { Note } from './types';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).pause();

/**
 * Запрашивает данные с консоли
 * @param query Запрос данных
 */
export const input = async (...query: string[]): Promise<string> => {
    rl.resume();
    const result = await rl.question(query.join(" "));
    rl.pause();

    return result;
}

/**
 * Функция для задержки
 * @param ms Милисекунды
 */
export const delay = (ms: number) => new Promise(res => {
    setTimeout(res, ms);
});

/**
 * Функция для получения данных введенной заметки, исходя из определенного массива заметок, передаваемого аргументом
 * @param notes Массив с определенными заметками 
 * @returns Данные заметки
 */
export const getSelectedFrom = async (notes: Array<Note>) => {
    const num = +(await input(">>> "));

    if(!notes[num - 1] && num) {
        console.log();
        console.log("Заметки с таким порядковым номером не найдено!");

        await delay(2000);

        router.route();
        return;
    }

    if(!num) {
        router.route();
        return;
    }

    const note = notes[num - 1];

    return {
        title: note.title,
        content: note.content
    }
}

/**
 * Функция для вывода данных заметки
 * @param note Заметка
 */
export const logNoteData = (note: Note) => {
    console.log();
    console.group("Данные заметки:");
    console.log(`- Заголовок: ${note!.title}`);
    console.log(`- Содержание: ${note!.content}`);
    console.groupEnd();
}