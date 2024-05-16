import { Injectable } from '@nestjs/common';
import * as Cron from 'cron';

@Injectable()
export class CronjobService {
  constructor() {
    console.log('constructor test');
  }

  setupCrons = () => {
    new Cron.CronJob('0 0 * * *', async () => {
      console.log('test cronjob');
    });
  };
}
