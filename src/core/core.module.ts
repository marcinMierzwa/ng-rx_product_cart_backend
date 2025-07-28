import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { validationPipeConfig } from './config/validation.config';

@Module({
    providers: [
        {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationPipeConfig),
    },
    ]
})
export class CoreModule {}
