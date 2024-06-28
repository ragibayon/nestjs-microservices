import {
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { CurrentUser, UserDto } from '@app/common';
import { type UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response, // pass the response to service without ending lifecycle
  ): Promise<void> {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  @UsePipes(new ValidationPipe())
  async authenticate(@CurrentUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
