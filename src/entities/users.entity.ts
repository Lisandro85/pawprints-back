import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column()
  email: string;

  @Column()
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
