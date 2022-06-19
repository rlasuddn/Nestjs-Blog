import { IsNotEmpty, IsString } from 'class-validator';

export class CommentRequestDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
