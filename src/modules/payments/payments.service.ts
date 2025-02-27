

import { BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Order } from '../orders/order.entity';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from '../../dto/payments/CreatePayment.dto';
import { UpdatePaymentDto } from '../../dto/payments/updatePayment.dto';
import { PaymentStatus } from '../../enum/payment.status.enum';

@Injectable ()

export class PaymentsService {

  constructor (

    private readonly paymentsRepository: PaymentsRepository,

    @InjectRepository (Order)
    private readonly orderRepository: Repository<Order>,

  ) {}

  async createPayment (createPaymentDto: CreatePaymentDto): Promise<Payment> {

    const { order_id, price } = createPaymentDto;
  
    if (!order_id) {

      throw new BadRequestException ('El ID de la orden es obligatorio.');

    }
  
    const order = await this.orderRepository.findOne ({ where: { id: order_id } });
  
    if (!order) {

      throw new NotFoundException (`Orden con ID ${order_id} no encontrada.`);

    }

    if (!price || price <= 0) {

      throw new BadRequestException ('El precio del pago debe ser un número positivo.');

    }
  
    if (order.payment) {

      throw new ConflictException (`La orden con ID ${order_id} ya tiene un pago registrado.`);
        
    }

    return this.paymentsRepository.createPayment (order, createPaymentDto);

  }

  async updatePaymentStatus (paymentId: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {

    const payment = await this.paymentsRepository.findPaymentById (paymentId);
  
    const newStatus = updatePaymentDto.status as PaymentStatus;
  
    if (!Object.values (PaymentStatus).includes (newStatus)) {

      throw new BadRequestException (`Estado de pago inválido: ${updatePaymentDto.status}`);

    }
  
    if (payment.status === PaymentStatus.APPROVED) {

      throw new ConflictException (`El pago con ID ${paymentId} ya está aprobado y no puede modificarse.`);

    }
  
    if (newStatus === PaymentStatus.APPROVED) {

      payment.invoicePaidAt = new Date ();

    }
  
    return this.paymentsRepository.updatePaymentStatus (payment, { ...updatePaymentDto, status: newStatus });     

  }   
    
}   




