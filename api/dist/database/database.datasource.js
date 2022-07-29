"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const databaseOption = {
    type: "postgres",
    host: process.env["POSTGRES_HOST"] || "localhost",
    port: parseInt(process.env["POSTGRES_PORT"] || "5432", 10),
    username: process.env["POSTGRES_USER"] || "postgres",
    password: process.env["POSTGRES_PASSWORD"] || "postgres",
    database: process.env["POSTGRES_DB"] || "quiz",
    synchronize: !!JSON.parse(process.env["TYPEORM_SYNCHRONIZE"] || "true"),
    entities: [__dirname + "/dist/**/*.entity.js"],
};
exports.dataSource = new typeorm_1.DataSource(Object.assign({}, databaseOption));
//# sourceMappingURL=database.datasource.js.map