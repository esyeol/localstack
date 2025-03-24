import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Res() res: Response, @Body('message') message: string) {
    // await this.registerService.
  }
}
