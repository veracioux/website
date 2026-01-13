import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestiaSwaggerComposer } from "@nestia/sdk";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = await NestiaSwaggerComposer.document(app, {});
  SwaggerModule.setup("swagger", app, document as any);
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
