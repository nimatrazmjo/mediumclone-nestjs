import { DataSource } from 'typeorm';
import ORMConfig from './orm.config';

export default new DataSource(ORMConfig);