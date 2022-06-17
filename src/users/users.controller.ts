import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AllExceptionsFilter } from 'src/http-exception.filter';
import { UserRequestDto } from './dto/user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async singUp(@Body() body: UserRequestDto) {
    await this.usersService.signUp(body);
    return '회원가입 성공';
  }
  @Post('login')
  async logIn(@Body() body: LoginRequestDto) {
    return {
      result: '로그인 성공!',
      token: await this.authService.jwtLogIn(body),
    };
  }
}
