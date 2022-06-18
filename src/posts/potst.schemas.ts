import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

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
}
export const PostSchema = SchemaFactory.createForClass(Post);
