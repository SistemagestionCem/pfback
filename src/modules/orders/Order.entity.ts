

/*import {

  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,  

} from 'typeorm';

import { User } from '../users/User.entity';
import { Payment } from '../payments/Payment.entity';
import { Notification } from '../notifications/Notification.entity';
import { Evidence } from '../evidences/Evidence.entity';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from '../../enum/orderstatus.enum';
import { v7 as uuid } from 'uuid';

@Entity ({ name: 'orders' })

export class Order {

  @PrimaryGeneratedColumn ('uuid')
  id: string = uuid ();

  @Column ()
  clientEmail: string;

  @Column ()
  clientDni: number;

  @ManyToOne (() => User, (user) => user.assignedOrders, { eager: true })
  @JoinColumn ({ name: 'technName', referencedColumnName: 'name' }) 
  assignedTechn: User;

  @Column ({

    type: 'enum',
    enum: EquipmentType,
    nullable: false,

  })

  equipmentType: EquipmentType;

  @Column ()
  imei: string;  

  @Column ()
  description: string;

  @Column ({

    type: 'enum',
    enum: OrderStatus,
    nullable: false,

  })

  status: OrderStatus;  

  @Column ({ type: 'jsonb', nullable: true }) 
  statusWithDate: { status: string; date: Date };

  @Column ({ type: 'jsonb', default: [] })
  statusHistory: { status: string; date: Date }[]; 
  
  @Column ({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | null;

  @ManyToOne (() => User, (user) => user.adminOrders, { eager: true })
  @JoinColumn ({ name: 'adminName', referencedColumnName: 'name' })
  Admin: User;

  @OneToMany (() => Evidence, (evidence) => evidence.order)
  evidences: Evidence [];

  @OneToMany (() => Notification, (notification) => notification.order)
  notifications: Notification [];

  @OneToOne (() => Payment, (payment) => payment.order)
  payment: Payment;
 
}*/

import {

  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,  

} from 'typeorm';

import { User } from '../users/User.entity';
import { Payment } from '../payments/Payment.entity';
import { Notification } from '../notifications/Notification.entity';
import { Evidence } from '../evidences/Evidence.entity';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from '../../enum/orderstatus.enum';
import { v7 as uuid } from 'uuid';

@Entity ({ name: 'orders' })

export class Order {

  @PrimaryGeneratedColumn ('uuid')
  id: string = uuid ();

  @Column ()
  clientEmail: string;

  @Column ()
  clientDni: number;

  @ManyToOne (() => User, (user) => user.assignedOrders, { eager: true })
  @JoinColumn ({ name: 'technId', referencedColumnName: 'id' }) 
  assignedTechn: User;

  @Column ({

    type: 'enum',
    enum: EquipmentType,
    nullable: false,

  })

  equipmentType: EquipmentType;

  @Column ()
  imei: string;  

  @Column ()
  description: string;

  @Column ({

    type: 'enum',
    enum: OrderStatus,
    nullable: false,

  })

  status: OrderStatus;  

  @Column ({ type: 'jsonb', nullable: true }) 
  statusWithDate: { status: string; date: Date };

  @Column ({ type: 'jsonb', default: [] })
  statusHistory: { status: string; date: Date }[]; 
  
  @Column ({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date | null;

  @ManyToOne (() => User, (user) => user.adminOrders, { eager: true })
  @JoinColumn ({ name: 'adminId', referencedColumnName: 'id' })
  Admin: User;

  @OneToMany (() => Evidence, (evidence) => evidence.order)
  evidences: Evidence [];

  @OneToMany (() => Notification, (notification) => notification.order)
  notifications: Notification [];

  @OneToOne (() => Payment, (payment) => payment.order)
  payment: Payment;
 
}
