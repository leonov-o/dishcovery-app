import fs from "fs";

export function requestLogger(req, res, next) {
    const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile("./logs/request.txt", logData, (err) => {
        if (err) {
            console.error('Помилка запису в журнал:', err);
        }
    });

    next();
}
