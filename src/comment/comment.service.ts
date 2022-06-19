import { HttpException, Injectable, Param } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/users.schemas';
import { CommentRepository } from './comment.repository';
import { CommentRequestDto } from './dto/comment.request.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async showComment(@Param('postId') postId: string) {
    // await this.commentRepository.
  }

  async createComment(@Param('postId') postId: string, body: CommentRequestDto, @CurrentUser() user: User) {
    const checkPost = await this.commentRepository.checkPost(postId);
    console.log(checkPost);
    if (!checkPost) {
      throw new HttpException('해당 게시물이 없습니다.', 400);
    }
    await this.commentRepository.createComment(postId, body, user);
  }
}
