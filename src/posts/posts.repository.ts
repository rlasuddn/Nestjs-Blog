import { HttpException, Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/users.schemas';
import { PostRequestDto } from './dto/post.request.dto';
import { Post } from './potst.schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  async createPost(body: PostRequestDto, @CurrentUser() user: User) {
    const salt = parseInt(process.env.Salt);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    await this.postModel.create({
      content: body.content,
      title: body.title,
      password: hashedPassword,
      nickname: user.nickname,
    });
  }

  async showPost() {
    return await this.postModel.find().select('+ title nickname').sort({ createdAt: -1 });
  }

  async updatePost(body: PostRequestDto, @Param('postId') postId: string, @CurrentUser() user: User) {
    const currentUser = user.nickname;
    const postUser = await this.postModel.findById(postId, { _id: false, nickname: true, password: true });

    const ispasswordValidated: boolean = await bcrypt.compare(body.password, postUser.password);
    if (!ispasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }
    if (currentUser !== postUser.nickname) {
      throw new HttpException('잘못된 접근입니다.', 400);
    }
    console.log(body.title, body.content);
    await this.postModel.findByIdAndUpdate(postId, { $set: { title: body.title, content: body.content } });
  }
}
