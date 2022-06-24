import { Body, HttpException, Injectable, Param } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/users.schemas';
import { CommentRepository } from './comment.repository';
import { CommentRequestDto } from './dto/comment.request.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async showComment(@Param('postId') postId: string) {
    return await this.commentRepository.showComment(postId);
  }

  async createComment(@Param('postId') postId: string, @Body() body: CommentRequestDto, @CurrentUser() user: User) {
    const checkPost = await this.commentRepository.checkPost(postId);
    if (!checkPost) {
      throw new HttpException('해당 게시물이 없습니다.', 400);
    }
    await this.commentRepository.createComment(postId, body, user);
  }

  async updateComment(@Param('postId') postId: string, @Param('commentId') commentId: string, @Body() body: CommentRequestDto, @CurrentUser() user: User) {
    const currentUser = user.nickname;
    const findCommentUser = await this.commentRepository.findCommentUser(postId, commentId);
    const commentUser = findCommentUser.comment[0].nickname;
    if (currentUser !== commentUser) {
      throw new HttpException('작성한 댓글만 수정이 가능합니다.', 400);
    }
    return await this.commentRepository.updateComment(postId, commentId, body);
  }

  async deleteComment(@Param('postId') postId: string, @Param('commentId') commentId: string, @CurrentUser() user: User) {
    const currentUser = user.nickname;
    const findCommentUser = await this.commentRepository.findCommentUser(postId, commentId);
    const commentUser = findCommentUser.comment[0].nickname;
    if (currentUser !== commentUser) {
      throw new HttpException('작성한 댓글만 삭제가 가능합니다.', 400);
    }
    return await this.commentRepository.deleteComment(postId, commentId);
  }
}
