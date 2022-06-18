import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { AllExceptionsFilter } from 'src/http-exception.filter';
import { User } from 'src/users/users.schemas';
import { PostRequestDto } from './dto/post.request.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseFilters(AllExceptionsFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async showPost() {
    return this.postsService.showPost();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: PostRequestDto, @CurrentUser() user: User) {
    await this.postsService.createPost(body, user);
    return '게시글 작성 성공!';
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':postId')
  async UpdatePost(@Body() body: PostRequestDto, @Param('postId') postId: string, @CurrentUser() user: User) {
    this.postsService.updatePost(body, postId, user);
    return '게시글 수정 성공';
  }
}
