import { BadRequestException, Injectable } from '@nestjs/common';
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
    const savedMessage = await this.messageRepository.save(newMessage);

    return savedMessage;
  }

  async getMessagesForUser(userId: string) {
    return this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
      order: { create_At: 'DESC' },
    });
  }

  async getMessagesCountForUser(userId: string) {
    const count = await this.messageRepository.count({
      where: { receiver: { id: userId }, isRead: false },
    });

    return count;
  }

  async changeIsRead(messageId: string) {
    const messageExist = await this.messageRepository.findOne({
      where: { id: messageId },
    });
    if (!messageExist) {
      throw new BadRequestException('Message not found');
    }

    messageExist.isRead = true;
    await this.messageRepository.save(messageExist);
    return { message: 'Message marked as read successfully' };
  }
}
