import mongoose from "mongoose";
import model from "./model.ts";
import { Note } from "../types.ts";

console.log('Подключение...');
await mongoose.connect("mongodb+srv://abzsaz:klcWQGoxFSbd3nYK@cluster0.yvskezp.mongodb.net/")
    .then(() => console.log("Info | MongoDB подключен"))
    .catch(console.error);
/**
 * Класс для удаленной работы с дб
 */
class Manager {
    /**
     * Метод для того, чтоб заносить данные в дб
     * @param title Заголовок
     * @param content Содержание
     */
    static async Post({ title, content }: Note) {
        await new model({ title, content }).save();
    }

    /**
     * Метод для получения всех заметок
     * @return Массив в заметками
     */
    static async GetAll(): Promise<Note[]> {
        return await model.find({});
    }

    /**
     * Метод для удаления заметки из дб
     * @param title Заголовок
     * @param content Содержание
     */
    static async Delete({ title, content }: Note) {
        await model.deleteOne({ title, content });
    }

    /**
     * 
     * @param obj Объект, фильтрующий получаемые данные 
     * @returns Массив с объектами которые соответствуют свойствам объекта из аргументов
     */
    static async GetWhere(obj: { [key: string]: unknown}): Promise<Note[]> {
        return await model.find(obj);
    }
}

export default Manager;