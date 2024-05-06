import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { time: string; date: string; msg: string } {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    return {
      time: currentTime,
      date: date.toLocaleDateString(),
      msg: 'Hello World!',
    };
  }
}
