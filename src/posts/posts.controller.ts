import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AllExceptionsFilter } from 'src/http-exception.filter';
import { User } from 'src/users/users.schemas';
import { PostRequestDto } from './dto/post.request.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(AllExceptionsFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async showPost() {
    const data = await this.postsService.showPost();
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: PostRequestDto, @CurrentUser() user: User) {
    await this.postsService.createPost(body, user);
    return { message: '게시글 작성 성공!' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':postId')
  async UpdatePost(@Body() body: PostRequestDto, @Param('postId') postId: string, @CurrentUser() user: User) {
    this.postsService.updatePost(body, postId, user);
    return { message: '게시글 수정 성공' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async detailPost(@Param('postId') postId: string) {
    return { data: await this.postsService.detailPost(postId) };
  }
}
