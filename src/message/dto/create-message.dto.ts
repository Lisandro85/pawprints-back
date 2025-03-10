import {
  IsUUID,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  receiverId: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsDate()
  create_At?: Date;
}
