import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): number {
    return 200;
  }
}
