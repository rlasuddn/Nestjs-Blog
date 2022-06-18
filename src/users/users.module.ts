import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schemas';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
