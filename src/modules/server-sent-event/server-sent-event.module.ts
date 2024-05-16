import { Module } from '@nestjs/common';
import { ServerSentEventController } from './server-sent-event.controller';

@Module({
  imports: [],
  controllers: [ServerSentEventController],
  providers: [],
  exports: [],
})
export class ServerSentEventModule {}
