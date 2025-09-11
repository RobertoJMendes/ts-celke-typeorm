import "reflect-metadata"
import { DataSource } from "typeorm"
//import { Photo } from "./entity/Photo"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 5002,
    username: "root",
    password: "654321",
    database: "typ",
    //entities: [Photo],
    synchronize: true,
    logging: false,
    entities: [],
    subscribers: [],
    migrations: [],
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
/*
try {
    await AppDataSource.initialize()
    console.log("DB - OK!")
} catch (error) {
    console.log(error)
}*/