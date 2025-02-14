

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  private mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences';
  private mercadoPagoPaymentUrl = 'https://api.mercadopago.com/v1/payments';

  constructor(
    private configService: ConfigService,
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async createPayment(orderId: string, price: number) {
    try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
      console.log('🔍 Access Token:', accessToken);
      
      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          items: [
            {
              title: `Pago por orden ${orderId}`,
              quantity: 1,
              currency_id: 'COP',
              unit_price: price,
            },
          ],
          back_urls: {
            success: 'http://localhost:3000/payments/success',
            failure: 'http://localhost:3000/payments/failure',
            pending: 'http://localhost:3000/payments/pending',
          },
          auto_return: 'approved',
          external_reference: orderId,
          sandbox_init_point: true,  
          payer: {
            email: 'test_user_12345678@test.com',
            /*email: 'janellispatricia@gmail.com',*/

          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      await this.paymentsRepository.createPayment(orderId, price);
      return { paymentUrl: response.data.init_point };
    } catch (error) {
      console.log('Error Mercado Pago:', error.response?.data || error.message);
      throw new Error(`Error al crear pago: ${error.message}`);
    }
  }

  async getPaymentStatus(paymentId: string) {
    try {
      const accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
      
      const response = await axios.get(
        `${this.mercadoPagoPaymentUrl}/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const status = response.data.status;
      await this.paymentsRepository.updatePaymentStatus(paymentId, status);
      return status;
    } catch (error) {
      throw new Error(`Error al obtener el estado del pago: ${error.message}`);
    }
  }

  async processPaymentUpdated(paymentId: string) {
    console.log(`🔍 Evento de pago actualizado recibido. ID: ${paymentId}`);
  

    const updated = await this.paymentsRepository.updatePaymentStatus(paymentId, 'approved');
  
    if (updated) {
      console.log(`Pago con ID ${paymentId} actualizado a estado: approved`);
    } else {
      console.log(`No se encontró pago con ID: ${paymentId} en la base de datos`);
    }
  }
  
  
}





