import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.js";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 5002,
    username: "root",
    password: "654321",
    database: "typ",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: ["dist/migration/*.js"],
});
//# sourceMappingURL=data-source.js.map