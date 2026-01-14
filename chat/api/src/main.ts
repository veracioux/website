import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestiaSwaggerComposer } from "@nestia/sdk";
import { SwaggerModule } from "@nestjs/swagger";
import { WsAdapter } from "@nestjs/platform-ws";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
  const document = await NestiaSwaggerComposer.document(app, {
    servers: [
      { url: "https://veracioux.me", description: "Production" },
      { url: "https://stg.veracioux.me", description: "Staging" },
      { url: "http://localhost:9000", description: "Development" },
    ],
  });
  SwaggerModule.setup("swagger", app, document as any, {
    jsonDocumentUrl: "openapi.json",
    yamlDocumentUrl: "openapi.yaml",
  });
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
