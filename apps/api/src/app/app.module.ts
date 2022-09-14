import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'postgresql',
      host: process.env.API_POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      dbName: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      debug: true,
    }),
    FormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
