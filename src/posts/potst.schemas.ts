import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose, { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema()
export class Comment {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  content: string;
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema(options)
export class Post extends Document {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop({
    type: [CommentSchema],
  })
  comment: Comment[];
}
export const PostSchema = SchemaFactory.createForClass(Post);
