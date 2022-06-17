import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/users.schemas';

export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}
