import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from 'config/application-config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: applicationConfig.db.host,
      port: parseInt(applicationConfig.db.port),
      username: applicationConfig.db.user,
      password: applicationConfig.db.password,
      database: applicationConfig.db.name,
      entities: [User, Post],
      synchronize: true,
    }),

    JwtModule.register({
      global: true,
      secret: applicationConfig.jwt.secret,
      signOptions: { expiresIn: '12h' },
    }),
    
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
