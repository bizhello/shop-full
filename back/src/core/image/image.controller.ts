import ValidateParamIdDto from '@app/common/dto/validate-id.dto';
import { RoutesEnum, TextEnum } from '@app/common/enums';
import ResUploadImage from '@app/core/image/dto/upload-image.response';
import ImageService from '@app/core/image/image.service';
import MFile from '@app/core/image/mfile.class';
import AuthGuard from '@app/guards/auth.guard';
import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

@UseGuards(new AuthGuard())
@Controller(RoutesEnum.IMAGES)
export default class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(RoutesEnum.BY_ID)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor(TextEnum.IMAGE))
  public async uploadImage(
    @Param() param: ValidateParamIdDto,
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ): Promise<ResUploadImage> {
    console.log('BEFORE CONVERT')
    const buffer = await this.imageService.convertToWebP(file.buffer);
    console.log('AFTER CONVERT')
    const newFile = new MFile({
      originalname: `${file.originalname.split('.')[0]}.webp`,
      buffer,
    });
    console.log('AFTER CREATE NEW FILE')

    return this.imageService.uploadImage(param.id, newFile);
  }

  @Delete(RoutesEnum.BY_ID)
  @HttpCode(200)
  public async deleteImage(
    @Param() param: ValidateParamIdDto,
  ): Promise<{ cardId: Types.ObjectId }> {
    return this.imageService.deleteImage(param.id);
  }
}
