import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
// import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    image: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    // return new Promise((resolve, reject) => {
    // const upload = v2.uploader.upload_stream((error, result) => {
    //   if (error) return reject('cloudinary upload error' + error);
    //   resolve(result);
    // });
    // toStream(image.buffer).pipe(upload);
    // const res: any = await this.convertToBase64(image);
    // const b64 = Buffer.from(image.buffer).toString('base64');
    // const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    // });
    const response = v2.uploader.upload(image, {
      resource_type: 'auto',
    });
    return response;
  }
}
