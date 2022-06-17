import { PickType } from '@nestjs/swagger';
import { User } from '../users.schemas';

export class UserResponseDto extends PickType(User, [
  'email',
  'password',
] as const) {}
