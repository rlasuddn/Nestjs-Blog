import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//Strategy는 인증 할때 사용
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더에 토큰으로부터 추출
      secretOrKey: process.env.SECRETKEY,
      ignoreExpiration: false, // 만료기간
    });
  }
}
