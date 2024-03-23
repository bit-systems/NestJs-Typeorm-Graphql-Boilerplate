import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EnvConfig } from '@src/libs/core/utils/config';
import compression from 'compression';
import helmet from 'helmet';
import { PinoLogger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            "'self'",
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
          manifestSrc: [
            "'self'",
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );
  app.use(compression());

  const configService = app.get(ConfigService<EnvConfig>);
  const port = configService.get<EnvConfig>('PORT', { infer: true });
  const env = configService.get<EnvConfig>('NODE_ENV', { infer: true });
  await app.listen(port);
  const logger = await app.resolve(PinoLogger);
  logger.info(
    `Application is running in "${env}" mode on http://localhost:${port}`,
  );
}
bootstrap();
