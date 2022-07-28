import { CLOUDINARY_CONFIG } from "@/core";
import { Cloundinary } from "@/entity";
import { CloundinaryReposiotry } from "@/repository";
import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
@Injectable()
export class CloundinaryService {
  constructor(private cloudinaryRepository: CloundinaryReposiotry) {
    // cloudinary.config({
    //   cloud_name: CLOUDINARY_CONFIG.NAME,
    //   api_key: CLOUDINARY_CONFIG.API_KEY,
    //   api_secret: CLOUDINARY_CONFIG.API_SECRET,
    //   secure: true,
    // });
    cloudinary.config({
      cloud_name: "dv6zan7ag",
      api_key: "756826445571745",
      api_secret: "nzl5H1ZXNUxxq0RxGOblGuYBELA",
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    isBanner = false,
    order = 0,
    isAvatar = false
  ): Promise<Cloundinary> {
    try {
      const path = `./${file.path}`;
      const result = await cloudinary.uploader.upload(path);
      fs.unlinkSync(`./${path}`);
      return this.cloudinaryRepository.save({
        ...result,
        isBanner,
        order,
        isAvatar,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFile(publicId: string) {
    return Promise.all([
      cloudinary.uploader.destroy(publicId),
      this.cloudinaryRepository.delete({ public_id: publicId }),
    ]);
  }

  async deleteMultiFile(publicIds: string[]) {
    return Promise.all([...publicIds.map((id) => this.deleteFile(id))]);
  }

  async uploadMultiFiles(files: Array<Express.Multer.File>) {
    // get all old banners
    // const oldBanners = await this.getIsBannerFiles();
    // const promiseRemoveOldBanners = oldBanners.map(({ public_id }) =>
    //   this.deleteFile(public_id)
    // );
    const promiseUploadFile = files.map((file, index) =>
      this.uploadFile(file, true, index + 1)
    );
    await Promise.all([...promiseUploadFile]);
  }

  async uploadMultiFilesAccount(
    files: Array<Express.Multer.File>
  ): Promise<Cloundinary[]> {
    const promiseUploadFile = files.map((file, index) =>
      this.uploadFile(file, false, index + 1, index === 0)
    );
    return Promise.all([...promiseUploadFile]);
  }
}
