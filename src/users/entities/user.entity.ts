import { Credentials } from 'src/credentials/credentials.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Credentials, (credentials) => credentials.user)
  @JoinColumn()
  credentials: Credentials;
}
