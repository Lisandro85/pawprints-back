import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credentials')
export class Credentials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userName: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => Users, (user) => user.credentials)
  user: Users;
}
