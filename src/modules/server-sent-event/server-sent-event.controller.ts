import { Observable, interval, map } from 'rxjs';
import { Controller, Sse } from '@nestjs/common';

@Controller('event')
export class ServerSentEventController {
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => {
        const messageEvent = new MessageEvent('message', {
          data: JSON.stringify({ hello: 'world' }),
        });
        return messageEvent;
      }),
    );
  }
}
