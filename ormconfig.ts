import { DataSource } from 'typeorm';
import { Offer } from './src/offers/entities/offer.entity';
import { User } from './src/users/entities/user.entity';
import { Wish } from './src/wisches/entities/wisch.entity';
import { Wishlist } from './src/wischlists/entities/wischlist.entity';
import { initMigration1681048409651 } from './src/database/migrations/1681048409651-initMigration';
import { changeWish11681048746753 } from './src/database/migrations/1681048746753-changeWish1';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // process.env.DATABASE_URL || 'localhost',
  port: 5432, // parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: 'student', // process.env.DATABASE_USERNAME || 'test',
  password: 'student', // process.env.DATABASE_PASSWORD || 'test',
  database: 'kupipodariday', //process.env.DATABASE_NAME || 'test',
  synchronize: false,
  // logging: true,
  entities: [Offer, User, Wish, Wishlist],
  // subscribers: [],
  migrations: [changeWish11681048746753],
});
