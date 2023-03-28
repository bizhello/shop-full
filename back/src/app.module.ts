import CoreModule from '@app/core/core.module';
import AuthMiddleware from '@app/middlewares/AuthMiddleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://mongodb:27017/nestjs'),
    CoreModule,
    ThrottlerModule.forRoot({
      ttl: +process.env.RATE_LIMITING_TTL,
      limit: +process.env.RATE_LIMITING_LIMIT,
    }),
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
