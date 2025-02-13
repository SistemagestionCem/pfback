

import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentsService } from './Payments.service';

@Controller ('payments')

export class PaymentsController {

  constructor (private readonly paymentsService: PaymentsService) {}
  
 
  @Get (':paymentId')

  async getPaymentStatus (@Param ('paymentId') paymentId: string) {

    return this.paymentsService.getPaymentStatus (paymentId);

  }

  @Post ('payment')

  async createPayment (@Body () createPaymentDto: { orderId: string; price: number }) {

    return this.paymentsService.createPayment (createPaymentDto.orderId, createPaymentDto.price);

  }


}
