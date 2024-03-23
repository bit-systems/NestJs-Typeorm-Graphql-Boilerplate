import { Controller, Get, Res } from '@nestjs/common';
import { AllowUnauthorizedRequest } from '@src/libs/core/decorators';
import { Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowUnauthorizedRequest()
  @Get()
  getHealth(@Res() res: Response) {
    res.sendStatus(this.appService.getStatus());
  }
}
