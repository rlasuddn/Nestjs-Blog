import { HttpException, Injectable, Param } from '@nestjs/common';
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
    await this.postModel.findByIdAndUpdate(postId, { $push: { comment: { postId, content: body, nickname: user.nickname } } });
  }
}
