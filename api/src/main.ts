import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { writeFileSync } from "fs";
import { join } from "path";
import { printSchema } from "graphql";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets("./downloads");
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle("Tempest Genshin ")
    .setDescription("Tempest Genshin API description")
    .setVersion("1.0")
    .addTag("tempest-genshin")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT || 3444);
}
bootstrap();
