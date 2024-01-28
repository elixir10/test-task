import fs from "fs";
import { routeFunctions } from "./types.ts";

/**
 * Маршрутизатор
 */
class Router {
    /**
     * Метод для получения Map со всеми функциями из папки functions
     */
    private async getFunctions() {
        const data: routeFunctions = new Map();
        const dir = fs.readdirSync(`./src/functions`);

        for(let file of dir) {
            const info = (await import(`./functions/${file}`)).default;

            data.set(info.name, info.exec);
        }

        return data;
    }

    /**
     * Метод, который запускает программу
     */
    async route() {
        console.clear();
        
        const functions = await this.getFunctions();
        const start = functions.get("start")!;
        
        const answer = await start();

        // запуск функций в зависимости от введенной цифры
        switch(answer) {
            case 1: 
                await functions.get("add")!();
                break;
            case 2: 
                await functions.get("show")!();
                break;
            case 3: 
                await functions.get("find")!();
                break;
            case 4: 
                await functions.get("delete")!();
                break;
            default:
                await this.route();
                break;
        }
    }
}

export default Router;