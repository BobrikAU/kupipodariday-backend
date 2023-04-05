import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WischesModule } from './wisches/wisches.module';
import { WischlistsModule } from './wischlists/wischlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // process.env.DATABASE_URL || 'localhost',
      port: 5432, // parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: 'student', // process.env.DATABASE_USERNAME || 'test',
      password: 'student', // process.env.DATABASE_PASSWORD || 'test',
      database: 'kupipodariday', //process.env.DATABASE_NAME || 'test',
      synchronize: false,
      // logging: true,
      entities: [],
      // subscribers: [],
      // migrations: [],
    }),
    UsersModule,
    WischesModule,
    WischlistsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
