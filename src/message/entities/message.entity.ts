import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', default: 'Sin asunto', nullable: true })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_At: Date;

  @Column({ default: false })
  deletedBySender: boolean;

  @Column({ default: false })
  deletedByReceiver: boolean;

  @ManyToOne(() => Users, (user) => user.sentMessages, { onDelete: 'CASCADE' })
  sender: Users;

  @ManyToOne(() => Users, (user) => user.receivedMessages, {
    onDelete: 'CASCADE',
  })
  receiver: Users;
}
