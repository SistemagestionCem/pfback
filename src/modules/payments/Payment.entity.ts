

import {

  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,

} from 'typeorm';

import { v7 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';
import { PaymentStatus } from '../../enum/payment.status.enum';

@Entity ({ name: 'payments' })

export class Payment {

  @PrimaryGeneratedColumn ('uuid')
  id: string = uuid ();

  @Column ({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'timestamptz', nullable: true })
  invoicePaidAt: Date | null;

  @Column ({

    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    nullable: false,

  })

  status: PaymentStatus;

  @Column ({ type: 'varchar', length: 50, nullable: true })
  externalOrderId: string | null;

  @OneToOne (() => Order, (order) => order.payment)
  @JoinColumn ({ name: 'order_id' })
  order: Order;

}

