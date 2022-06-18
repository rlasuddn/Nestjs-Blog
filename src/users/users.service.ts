import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto) {
    const { email, nickname, password } = body;
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 유저 입니다.');
    }
    const salt = parseInt(process.env.Salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.usersRepository.createUser({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
