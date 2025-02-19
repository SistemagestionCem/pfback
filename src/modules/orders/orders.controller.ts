

import { Controller, Patch, Param, Body, Get, Post, Put, NotFoundException, ForbiddenException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { UpdateTechicalDataDto } from 'src/dto/orders/updateTechData.dto';
import { UpdateStatusDto } from 'src/dto/orders/updateTechStatus.dto';

@Controller ('orders')

export class OrdersController {

  constructor (

    private readonly ordersService: OrdersService,   

  ) {}

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/
  @Get () // Endpoint verificado!

  async getAllOrders (): Promise<Order []> {

    return this.ordersService.getAllOrders ();

  }

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/
  @Get ('email/:clientEmail') // Endpoint verificado!

  async getOrdersByClientEmail (@Param ('clientEmail') clientEmail: string): Promise<Order []> {

    return this.ordersService.getOrdersByClientEmail (clientEmail);


  }

  /* Este Endpoint es de uso exclusivo del/los Tecnico(s).*/ 
  @Get ('technician/:technId') 

  async getOrdersByTechnId (@Param ('technId') technId: string): Promise<Order []> {

    return this.ordersService.getOrdersByTechnId (technId);

  }

  /*@Get ('status/:status')

  async getByStatus (@Param ('status') status: OrderStatus): Promise<Order []> {

    return this.ordersService.getByStatus (status);

  }*/

  /* Este Endpoint es de uso exclusivo del/los Administrador(es) y/o Cliente(s).*/ 
  @Get (':id') 
              
  async getOrderById (@Param ('id') orderId: string): Promise<Order> {

    return this.ordersService.getOrderById (orderId);

  }

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/ 
  @Post ('create')

  async createOrder (@Body () createOrderDto: CreateOrderDto): Promise<Order> {

    return this.ordersService.createOrder (createOrderDto);

  }

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/ 
  @Patch(':id')

  async updateOrder (

    @Param ('id') id: string,
    @Body () updateOrderDto: UpdateOrderDto,

  ) {

    return this.ordersService.updateOrder (id, updateOrderDto);
    
  }

  /* Este Endpoint es de uso exclusivo del/los Tecnico(s).*/
  @Patch ('technicaldata/:id') // Endpoint verificado!

  async updateTechnicalData (

    @Param ('id') orderId: string,
    @Body () updateTechnicalDataDto: UpdateTechicalDataDto

  ): Promise<Order> {

    return this.ordersService.updateTechnicalData (orderId, updateTechnicalDataDto);

  }

  /* Este Endpoint es de uso exclusivo del/los Tecnico(s).*/
  @Patch (':id/status') // Endpoint verificado!

  async updateOrderStatus (

    @Param ('id') orderId: string,
    @Body() updateStatusDto: UpdateStatusDto

  ): Promise<Order> {

    return this.ordersService.updateOrderStatus(orderId, updateStatusDto);

  }

  /* Falso Delete: Este Endpoint es de uso exclusivo del/los Administrador(es).*/ 
  @Put ('inactivate/:id')

  async inactivedelete ( 

    @Param ('id') orderId: string,
    @Body () updateOrderDto: UpdateOrderDto

  ): Promise<{ message: string }> {

  return this.ordersService.inactiveDelete (orderId, updateOrderDto);

  }

} 