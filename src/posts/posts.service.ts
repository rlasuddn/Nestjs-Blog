import { Injectable, Param } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/users.schemas';
import { PostRequestDto } from './dto/post.request.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async showPost() {
    return await this.postsRepository.showPost();
  }

  async createPost(body: PostRequestDto, @CurrentUser() user: User) {
    await this.postsRepository.createPost(body, user);
  }

  async updatePost(body: PostRequestDto, @Param('postId') postId: string, @CurrentUser() user: User) {
    await this.postsRepository.updatePost(body, postId, user);
  }

  async detailPost(postId: string) {
    return await this.postsRepository.detailPost(postId);
  }
}
