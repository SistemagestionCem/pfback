import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/User.entity';
import { OrderHistory } from '../orderHistories/OrderHistory.entity';
import { Payment } from '../payments/Payment.entity';
import { Notification } from '../notifications/Notification.entity';
import { Evidence } from '../evidences/Evidence.entity';

<<<<<<< HEAD
@Entity({
  name: 'orders',
})
=======

import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/User.entity";
import { OrderHistory } from "../orderHistories/orderHistory.entity";

@Entity ('orders')

>>>>>>> 2f8314dfd0ec168c45535fc6a1277334a8731b10
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'userId' })
  userId: string;

  @Column()
  clientEmail: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  clientDni: number;

  @ManyToOne(() => User, (user) => user.order, { eager: true })
  user: User;

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistory[];

  @OneToMany(() => Notification, (notification) => notification.order)
  notifications: Notification[];

<<<<<<< HEAD
  @OneToMany(() => Evidence, (evidence) => evidence.order)
  evidences: Evidence[];
=======
  @OneToMany (() => Evidence, evidence => evidence.order)
  evidences: Evidence [];

  @OneToOne (() => Payment, payment => payment.order)
  payments: Payment [];
>>>>>>> 2f8314dfd0ec168c45535fc6a1277334a8731b10

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}
