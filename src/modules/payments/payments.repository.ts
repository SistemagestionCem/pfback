
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './Payment.entity';

@Injectable ()

export class PaymentsRepository {

  constructor (

    @InjectRepository (Payment)

    private readonly paymentRepository: Repository<Payment>,

  ) {}

  async createPayment (orderId: string, price: number): Promise<Payment> {

    const payment = this.paymentRepository.create ({

      price,
      invoicePaidAt: new Date (),
      status: 'pending',
      order: { id: orderId },

    });

    return this.paymentRepository.save(payment);

  }

  async updatePaymentStatus (paymentId: string, status: string): Promise<void> {

    await this.paymentRepository.update(paymentId, { status });

  }
  
}
