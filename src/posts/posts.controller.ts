import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user';
import { CurrentUserDecoratorTypes } from '../types';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@CurrentUser() currentUser: CurrentUserDecoratorTypes, @Body() createPostDto: CreatePostDto) {
    console.log(currentUser)
    return this.postsService.create(createPostDto, currentUser.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@CurrentUser() currentUser: CurrentUserDecoratorTypes, @Param('id') id: string) {
    return this.postsService.findOne(id, currentUser.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@CurrentUser() currentUser: CurrentUserDecoratorTypes) {
    return this.postsService.findAll(currentUser.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
