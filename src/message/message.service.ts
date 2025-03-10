import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
    subject: string,
  ) {
    const newMessage = await this.messageRepository.create({
      sender: { id: senderId } as Users,
      receiver: { id: receiverId } as Users,
      message,
      subject,
    });
    return this.messageRepository.save(newMessage);
  }

  async getMessagesForUser(userId: string) {
    return this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
      order: { create_At: 'DESC' },
    });
  }
  async markAsRead(messageId: string) {
    return this.messageRepository.update(messageId, { isRead: true });
  }
}
