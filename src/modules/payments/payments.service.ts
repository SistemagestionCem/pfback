

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
      
      const response = await axios.post(
        this.mercadoPagoUrl,
        {
          items: [
            {
              title: `Pago por orden ${orderId}`,
              quantity: 1,
              currency_id: 'ARS',
              unit_price: price,
            },
          ],
          back_urls: {
            success: 'https://tu-sitio.com/success',
            failure: 'https://tu-sitio.com/failure',
            pending: 'https://tu-sitio.com/pending',
          },
          auto_return: 'approved',
          external_reference: orderId,
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
}


