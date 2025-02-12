

import {

  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,

} from 'typeorm';

import { v7 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';

@Entity ({

  name: 'payments',

})

export class Payment {

  @PrimaryGeneratedColumn ('uuid')
  id: string = uuid ();

  @Column ({

    type: 'decimal',
    nullable: false,

  })
  price: number;

  @Column ({

    type: 'timestamp',
    nullable: false,
    precision: 0,

  })
  invoicePaidAt: Date;

  @OneToOne ( () => Order, (order) => order.payment)
  @JoinColumn ({ name: 'order_id' })
  order: Order;

}
