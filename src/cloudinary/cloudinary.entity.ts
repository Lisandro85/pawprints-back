import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cloudinary')
export class Cloudinary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  urlImg: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  adress: string;

  @ManyToOne(() => Users, (user) => user.posts, { onDelete: 'CASCADE' })
  user: Users;
}
