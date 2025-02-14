

import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentsService.getPaymentStatus(paymentId);
  }

  @Post()
  async createPayment(@Body() createPaymentDto: { orderId: string; price: number }) {
    return this.paymentsService.createPayment(createPaymentDto.orderId, createPaymentDto.price);
  }

  @Post('webhook')
  async handleMercadoPagoWebhook(@Body() payload: any) {
    console.log('Evento recibido de Mercado Pago:', payload);
    
    if (payload.action === 'payment.updated') {
      const paymentId = payload.data.id; 
      await this.paymentsService.processPaymentUpdated(paymentId);
    } else if (payload.type === 'payment.succeeded') {
      console.log(`Pago exitoso: ${payload.data.id}`);
    } else if (payload.type === 'payment.rejected') {
      console.log(`Pago rechazado: ${payload.data.id}`);
    } else {
      console.log('Evento desconocido:', payload);
    }

    return { status: 'success' };
  }
}
