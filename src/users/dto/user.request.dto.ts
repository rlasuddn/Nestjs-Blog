import { PickType } from '@nestjs/swagger';
import { User } from '../users.schemas';

export class UserRequestDto extends PickType(User, [
  'email',
  'nickname',
  'password',
] as const) {}
