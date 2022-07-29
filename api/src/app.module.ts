import { AuthModule } from "@/auth";
import { CloudinaryModule } from "@/cloudinary";
import { MailerModule } from "@/mailer";
import { RepositoryModule } from "@/repository";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "@/database";
import { UploadFileInterceptor } from "./interceptors/upload-file.interceptor";
import { DriveModule } from "@/drive/drive.module";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { PdfModule } from "./pdf";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmExModule } from "./decorator";
import { Drive, LIST_ENTITY, User, VnPay } from "./entity";
@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    // BullModule.forRoot({
    //   redis: {
    //     host: "localhost",
    //     port: 6379,
    //   },
    // }),
    DatabaseModule,
    MailerModule,
    RepositoryModule,
    AuthModule,
    MulterModule,
    CloudinaryModule,
    DriveModule,
    PdfModule,
    HttpModule,
    TypeOrmExModule.forCustomRepository(LIST_ENTITY),
  ],
  controllers: [AppController],
  providers: [AppService, UploadFileInterceptor, ],
})
export class AppModule {}
