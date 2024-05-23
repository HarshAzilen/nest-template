import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CronjobService],
  exports: [CronjobService],
})
export class CronJobModule {}
