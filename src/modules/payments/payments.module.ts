

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './Payment.entity';
import { PaymentsService } from '../payments/payments.service';
import { PaymentsController } from '../payments/payments.controller';
import { PaymentsRepository } from './payments.repository';


@Module ({

  imports: [TypeOrmModule.forFeature ([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
  exports: [PaymentsService, PaymentsRepository],

})

export class PaymentsModule {}


