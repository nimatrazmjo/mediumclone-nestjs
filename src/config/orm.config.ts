import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ORMConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'mediumclone',
    synchronize: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}']
};

export default ORMConfig;