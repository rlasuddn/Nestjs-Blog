import { Injectable, Param } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/users.schemas';
import { CommentRepository } from './comment.repository';
import { CommentRequestDto } from './dto/comment.request.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(@Param('postId') postId: string, body: CommentRequestDto, @CurrentUser() user: User) {
    await this.commentRepository.createComment(postId, body, user);
  }
}
