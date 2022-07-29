import { DataSource, DataSourceOptions } from "typeorm"

const databaseOption : DataSourceOptions = {
    type: "postgres",
    host: process.env["POSTGRES_HOST"] || "localhost",
    port: parseInt(process.env["POSTGRES_PORT"] || "5432", 10),
    username: process.env["POSTGRES_USER"] || "postgres",
    password: process.env["POSTGRES_PASSWORD"] || "postgres",
    database: process.env["POSTGRES_DB"] || "baseDb",
    synchronize: !!JSON.parse(process.env["TYPEORM_SYNCHRONIZE"] || "true"),
    entities: [__dirname + "/dist/**/*.entity.js"],
    
  }

  export const dataSource =new DataSource({...databaseOption})