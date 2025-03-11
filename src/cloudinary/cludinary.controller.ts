import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Formato de archivo no permitido. Usa JPEG o PNG.',
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: string; description: string; adress: string },
  ) {
    try {
      if (!file) {
        throw new BadRequestException('No se ha subido ningún archivo');
      }
      const result = await this.uploadService.uploadImage(
        file,
        body.userId,
        body.description,
        body.adress,
      );

      return { message: 'Imagen subida y post creado con éxito', result };
    } catch (error) {
      throw error;
    }
  }
  @Get()
  getAllImages() {
    return this.uploadService.getAllImages();
  }
}
