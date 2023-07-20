import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from "./dto/createUser.dto";

@Controller("public")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mail')
  async getUserByMail(@Body('email') mail: string) {
    const response = await this.appService.getUserByMail(mail);
    return response.email
  }

  @Post()
  async CreateUser(@Body() user:CreateUser) {
    await this.appService.createUser(user);
  }

}
