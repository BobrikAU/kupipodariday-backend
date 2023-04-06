import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Length, IsNotEmpty, IsUrl } from 'class-validator';
import { Wish } from '../../wisches/entities/wisch.entity';

@Entity()
export class Wischlist {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
