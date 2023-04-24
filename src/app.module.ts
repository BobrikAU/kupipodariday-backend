import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WischesModule } from './wisches/wisches.module';
import { WischlistsModule } from './wischlists/wischlists.module';
import { OffersModule } from './offers/offers.module';
import { Offer } from './offers/entities/offer.entity';
import { User } from './users/entities/user.entity';
import { Wish } from './wisches/entities/wisch.entity';
import { Wishlist } from './wischlists/entities/wischlist.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config';
import { initMigration1681048409651 } from './database/migrations/1681048409651-initMigration';
import { changeWish11681048746753 } from './database/migrations/1681048746753-changeWish1';
import { changeWish21681064987122 } from './database/migrations/1681064987122-changeWish2';
import { changeOffer11681233144859 } from './database/migrations/1681233144859-changeOffer1';
import { changeUser11681658048773 } from './database/migrations/1681658048773-changeUser1';
import { changeWish31682161462011 } from './database/migrations/1682161462011-changeWish3';
import { changeWishlists11682238765586 } from './database/migrations/1682238765586-changeWishlists1';
import { changeWishlists21682267419503 } from './database/migrations/1682267419503-changeWishlists2';
import { changeWishlists21682268049343 } from './database/migrations/1682268049343-changeWishlists2';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.post'),
        username: configService.get('database.usename'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
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
      }),
    }),
    UsersModule,
    WischesModule,
    WischlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
