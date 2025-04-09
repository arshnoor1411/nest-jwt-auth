import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ){}
  async create(createPostDto: CreatePostDto, userId: string) {
    await this.postRepository.save({
      postContent: createPostDto.postContent,
      userId
    })

    return 'Post Created Successfully'
  }

  async findOne(id: string, userId: string) {
    return await this.postRepository.findOne({
      where:{
        id,
        userId
      }
    })
  }

  findAll(userId: string) {
    return this.postRepository.find({
      where:{
        userId
      }
    })
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `Post Updated Successfully`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
