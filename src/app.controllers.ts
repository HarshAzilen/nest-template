import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health-check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { time: string; date: string; msg: string } {
    return this.appService.getHello();
  }
}
