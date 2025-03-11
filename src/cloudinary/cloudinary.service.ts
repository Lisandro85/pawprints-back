import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as cloudinary from 'cloudinary';
import * as streamifier from 'streamifier';
import { Cloudinary } from './cloudinary.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Cloudinary)
    private cloudinaryRepository: Repository<Cloudinary>,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async uploadImage(
    file: Express.Multer.File,
    userId: string,
    description: string,
    adress: string,
  ) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto' },
        async (error, result) => {
          if (error) {
            reject(error);
          }
          const user = await this.usersRepository.findOne({
            where: { id: userId },
          });
          if (!user) {
            reject('Usuario no encontrado');
          }
          if (user) {
            const newCloudinaryRecord = this.cloudinaryRepository.create({
              urlImg: result?.secure_url,
              description,
              user,
              adress,
            });
            await this.cloudinaryRepository.save(newCloudinaryRecord);
            resolve(result);
          } else {
            reject('Usuario no encontrado');
          }
        },
      );

      const bufferStream = streamifier.createReadStream(file.buffer);
      bufferStream.pipe(stream);
    });
  }
  async getAllImages() {
    const post = await this.cloudinaryRepository.find({ relations: ['user'] });
    return post;
  }
}
