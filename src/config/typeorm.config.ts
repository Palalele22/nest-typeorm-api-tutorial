import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { UserPreferences } from "src/userprefs/userprefs.entity";
import { Club } from "src/club/club.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Palaghianu22',
    database: 'test2',
    entities: [User, UserPreferences, Club],
    synchronize: true,
}