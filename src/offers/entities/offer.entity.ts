import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wisches/entities/wisch.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column('numeric', { precision: 10, scale: 2, nullable: false })
  @IsNotEmpty()
  amount: number;

  @Column('boolean', { default: false })
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
