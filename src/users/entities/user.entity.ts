import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, unique: true, nullable: true })
  username: string;

  @Column('varchar', {
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @Column('varchar', { default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column()
  wishes: number[];

  @Column()
  offers: number[];

  @Column()
  wishlist: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
