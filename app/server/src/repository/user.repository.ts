import { AppDatasource } from "../libs/db";
import { User } from "../models/user";
import { CreateUser } from "../models/user/type";
import { withMeasurementLog } from "../util/decorator/withMeasurementLog";

const repository = AppDatasource.getRepository(User);

class UserRepository {
    constructor() {}

    @withMeasurementLog
    async createIfNotExist(inputUser: CreateUser): Promise<User> {
        const insertResult = await repository.findOne({
            where: { email: inputUser.email },
        });
        if (insertResult) return insertResult;

        return await repository.save(inputUser);
    }

    @withMeasurementLog
    async findOne(id: string): Promise<User> {
        return await repository.findOneBy({ id });
    }

    @withMeasurementLog
    async findAll(): Promise<User[]> {
        return await repository.find();
    }

    @withMeasurementLog
    async similarity(
        word: string
    ): Promise<{ similarity: string; name: string }[]> {
        const result: { similarity: string; name: string }[] = await repository
            .createQueryBuilder("user")
            .select(
                `word_similarity(:word, to_tsvector(user.name)::text)`,
                "similarity"
            )
            .addSelect("user.name", "name")
            .setParameter("word", word)
            .getRawMany();

        return result;
    }

    @withMeasurementLog
    async match(word: string): Promise<User[]> {
        const result = await repository
            .createQueryBuilder("user")
            .select()
            .where(
                "to_tsvector('english', user.name) @@ to_tsquery('english',:word)",
                { word }
            )
            .getMany();

        return result;
    }
}

export const userRepository = new UserRepository();
