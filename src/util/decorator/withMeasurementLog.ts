import logger from "../../libs/logger";

export function withMeasurementLog(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any) => Promise<any>>
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<any> {
        const functionName = `${target.constructor.name}.${propertyKey}`;

        const current = Date.now();
        const result = await originalMethod.apply(this, args);
        const executionTime = Date.now() - current;
        const logText = `${functionName} execution times = ${executionTime}ms`;
        logger.info(logText);

        return result;
    };

    return descriptor;
}
