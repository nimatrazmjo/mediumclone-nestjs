import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ORMConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'mediumclone',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};

export default ORMConfig;