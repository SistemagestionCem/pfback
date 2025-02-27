

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Order } from '../orders/order.entity';
import { PaymentStatus} from '../../enum/payment.status.enum';
import { CreatePaymentDto } from '../../dto/payments/createPayment.dto';
import { UpdatePaymentDto } from '../../dto/payments/updatePayment.dto';

@Injectable ()

export class PaymentsRepository {

  constructor (
    
    @InjectRepository (Payment)

    private readonly paymentRepository: Repository<Payment>,

  ) {}

  async createPayment (order: Order, createPaymentDto: CreatePaymentDto): Promise<Payment> {

    const payment = this.paymentRepository.create ({

      order,
      price: createPaymentDto.price,
      status: PaymentStatus.PENDING,

    });
  
    await this.paymentRepository.save (payment);

    return this.paymentRepository.findOne ({

      where: { id: payment.id },
      relations: ['order'],

    });

  }

  async findPaymentById (paymentId: string): Promise<Payment | null> {

    return this.paymentRepository.findOne ({

      where: { id: paymentId },
      relations: ['order'],

    });

  }
  
  async updatePaymentStatus (payment: Payment, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    
    payment.status = updatePaymentDto.status as PaymentStatus;  
    
    await this.paymentRepository.save (payment);
  
    return this.paymentRepository.findOne ({

      where: { id: payment.id },
      relations: ['order'],

    });

  }  

}








