import { Body, HttpException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { Post } from 'src/posts/potst.schemas';
import { User } from 'src/users/users.schemas';
import { CommentRequestDto } from './dto/comment.request.dto';

@Injectable()
export class CommentRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  async checkPost(@Param('postId') postId: string) {
    return await this.postModel.findOne({ _id: postId });
  }

  async createComment(@Param('postId') postId: string, body: CommentRequestDto, @CurrentUser() user: User) {
    await this.postModel.findByIdAndUpdate(postId, { $push: { comment: { content: body.content, nickname: user.nickname } } });
  }

  async showComment(@Param('postId') postId: string) {
    return await this.postModel.findById(postId, { _id: false, comment: true });
  }

  async findCommentUser(@Param('postId') postId: string, @Param('commentId') commentId: string) {
    console.log(commentId);
    return await this.postModel.findOne({ _id: postId }, { comment: { $elemMatch: { _id: commentId } } });
  }

  async updateComment(@Param('postId') postId: string, @Param('commentId') commentId: string, @Body() body: CommentRequestDto) {
    return await this.postModel.updateOne({ _id: postId, comment: { $elemMatch: { _id: commentId } } }, { $set: { 'comment.$.content': body.content } });
  }

  async deleteComment(@Param('postId') postId: string, @Param('commentId') commentId: string) {
    return await this.postModel.updateOne({ _id: postId }, { $pull: { comment: { _id: commentId } } });
  }
}
