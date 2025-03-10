import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
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

  @Get('receiver/:userId')
  getMessagesCountForUser(@Param('userId') userId: string) {
    return this.messageService.getMessagesCountForUser(userId);
  }

  @Patch('receiver/:messageId')
  changeIsRead(@Param('messageId') messageId: string) {
    return this.messageService.changeIsRead(messageId);
  }
}
