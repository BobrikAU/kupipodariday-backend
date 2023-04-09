import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wischlists/entities/wischlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: false })
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @Column({ nullable: false })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @Column({ nullable: false })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @Column('decimal', { scale: 2, nullable: false })
  @IsNotEmpty()
  price: number;

  @Column('decimal', { scale: 2, default: 0 })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column('varchar', { length: 1024 })
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wischlist: Wishlist;

  @Column('integer', { default: 0 })
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
