
<<<<<<< HEAD
import { OrderHistory } from '../orderHistories/orderHistory.entity';
import { Order } from './Order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistory, Order])],
=======

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Module ({

  imports: [TypeOrmModule.forFeature ([Order])],  
>>>>>>> 2f8314dfd0ec168c45535fc6a1277334a8731b10
  controllers: [OrdersController],
  providers: [OrdersService],

})

export class OrdersModule {}

