import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { User } from 'src/users/users.schemas';
import { CommentService } from './comment.service';
import { CommentRequestDto } from './dto/comment.request.dto';

@Controller('comments')
@UseFilters(HttpExceptionFilter)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async showComment(@Param('postId') postId: string) {
    await this.commentService.showComment(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async createComment(@Param('postId') postId: string, @Body() body: CommentRequestDto, @CurrentUser() user: User) {
    await this.commentService.createComment(postId, body, user);
    return { message: '댓글 작성 완료!' };
  }
}
