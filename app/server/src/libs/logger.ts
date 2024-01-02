import {
    LoggerOptions,
    createLogger,
    format, transports
} from "winston";
import LokiTransport from "winston-loki";
import { envConfig } from "../config/env";

const options: LoggerOptions = {
    level: "debug",
    defaultMeta: {
        labels: { 
            job: "my-application" ,
            env: envConfig.nodeEnv,
            container: envConfig.containerName
        },
    },
    transports: [
        new LokiTransport({ host: envConfig.lokiUrl }),
        new transports.Console({
            format: format.combine(
                format.colorize({
                    colors: {
                        info: "green",
                        error: "red",
                    },
                }),
                format.simple()
            ),
        }),
    ],
};

const logger = createLogger(options);

export default logger;
