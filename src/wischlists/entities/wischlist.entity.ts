import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Length, IsNotEmpty, IsUrl } from 'class-validator';
import { Wish } from '../../wisches/entities/wisch.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: false })
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @Column('varchar', { length: 1500 })
  @Length(1, 1500)
  description: string;

  @Column({ nullable: false })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.wischlist)
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
