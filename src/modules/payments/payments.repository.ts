

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './Payment.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(orderId: string, price: number): Promise<Payment> {
    const payment = this.paymentRepository.create({
      price,
      invoicePaidAt: new Date(),
      status: 'pending',
      order: { id: orderId },
    });
    return this.paymentRepository.save(payment);
  }

  async updatePaymentStatus(paymentId: string, status: string): Promise<boolean> {
    const result = await this.paymentRepository.update({ id: paymentId }, { status });
  
    console.log(`🔍 Resultado de update:`, result);
    
    return result.affected !== undefined && result.affected > 0;
  }
  

  async findByOrderId(orderId: string): Promise<Payment | null> {
    return this.paymentRepository.findOne({ where: { order: { id: orderId } } });
  }
  
}




