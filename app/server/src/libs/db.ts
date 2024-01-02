import { DataSource } from "typeorm";
import { envConfig } from "../config/env";
import { User } from '../models/user';

export const AppDatasource = new DataSource({
    type: "postgres",
    host: envConfig.dbHost,
    port: envConfig.dbPort,
    username: "postgres",
    password: "postgres123",
    database: "postgres",
    synchronize: true,
    entities: [User]
});
