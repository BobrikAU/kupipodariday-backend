import { DataSource } from 'typeorm';
import { Offer } from './src/offers/entities/offer.entity';
import { User } from './src/users/entities/user.entity';
import { Wish } from './src/wisches/entities/wisch.entity';
import { Wishlist } from './src/wischlists/entities/wischlist.entity';
import { initMigration1681048409651 } from './src/database/migrations/1681048409651-initMigration';
import { changeWish11681048746753 } from './src/database/migrations/1681048746753-changeWish1';
import { changeWish21681064987122 } from './src/database/migrations/1681064987122-changeWish2';
import { changeOffer11681233144859 } from './src/database/migrations/1681233144859-changeOffer1';
import { changeUser11681658048773 } from './src/database/migrations/1681658048773-changeUser1';
import { changeWish31682161462011 } from './src/database/migrations/1682161462011-changeWish3';
import { changeWishlists11682238765586 } from './src/database/migrations/1682238765586-changeWishlists1';
import { changeWishlists21682267419503 } from './src/database/migrations/1682267419503-changeWishlists2';
import { changeWishlists21682268049343 } from './src/database/migrations/1682268049343-changeWishlists2';

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
  migrations: [
    initMigration1681048409651,
    changeWish11681048746753,
    changeWish21681064987122,
    changeOffer11681233144859,
    changeUser11681658048773,
    changeWish31682161462011,
    changeWishlists11682238765586,
    changeWishlists21682267419503,
    changeWishlists21682268049343,
  ],
});
