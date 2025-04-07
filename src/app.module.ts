import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from 'config/application-config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: applicationConfig.db.host,
      port: parseInt(applicationConfig.db.port),
      username: applicationConfig.db.user,
      password: applicationConfig.db.password,
      database: applicationConfig.db.name,
      entities: [],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
