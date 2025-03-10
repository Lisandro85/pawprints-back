import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.sendMessage(
      createMessageDto.senderId,
      createMessageDto.receiverId,
      createMessageDto.message,
      createMessageDto.subject,
    );
  }

  @Get('user/:userId')
  getMessages(@Param('userId') userId: string) {
    return this.messageService.getMessagesForUser(userId);
  }
  @Patch('read/:id')
  markAsRead(@Param('id') messageId: string) {
    return this.messageService.markAsRead(messageId);
  }
}
