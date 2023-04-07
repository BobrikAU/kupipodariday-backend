import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length, IsNotEmpty, IsUrl, IsEmail } from 'class-validator';
import { Wish } from '../../wisches/entities/wisch.entity';
import { Wishlist } from '../../wischlists/entities/wischlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, unique: true, nullable: true })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column('varchar', {
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column('varchar', { default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column('varchar', { unique: true, nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('varchar', { nullable: true })
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}