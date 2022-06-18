import { PickType } from '@nestjs/swagger';
import { Post } from '../potst.schemas';

export class PostRequestDto extends PickType(Post, ['content', 'title', 'password'] as const) {}
