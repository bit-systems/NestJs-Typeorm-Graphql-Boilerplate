import { DBModule } from '@libs/db/db.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { validateEnv } from '@src/libs/core/utils/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config => {
        return validateEnv(config);
      },
    }),
    DBModule,
    UserModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): ApolloDriverConfig => ({
        autoSchemaFile: true,
        playground: process.env.NODE_ENV !== 'production',
        formatError: err => ({
          message: err.message,
          status: err.extensions?.code,
          statusCode: (err.extensions?.originalError as any)?.statusCode,
        }),
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res,
        }),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            ignore: 'pid,req,res,hostname',
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
