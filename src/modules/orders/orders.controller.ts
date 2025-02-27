

import {

  Controller,
  Patch,
  Param,
  Body,
  Get,
  Post,
  Put,
  
} from '@nestjs/common';

import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/roles/role.guard';
import { Roles } from 'src/decorators/role/role.decorator';
import { Role } from 'src/enum/Role.enum';

@Controller ('orders')

export class OrdersController {

  constructor (

    private readonly ordersService: OrdersService,

  ) {}

  @Get ()
  /*@Roles (Role.ADMIN)
  @UseGuards (AuthGuard, RoleGuard)*/

  async getAllOrders (): Promise<Order []> {

    return this.ordersService.getAllOrders ();

  }
  
  @Get ('email/:clientEmail') 
  /*@Roles (Role.ADMIN)
  @UseGuards (AuthGuard, RoleGuard)*/

  async getOrdersByClientEmail (

    @Param ('clientEmail') clientEmail: string,

  ): Promise<Order []> {

    return this.ordersService.getOrdersByClientEmail (clientEmail);

  }

  @Get ('technician/:technName') 
  /*@Roles (Role.TECHN)
  @UseGuards (AuthGuard, RoleGuard)*/

  async getOrdersByTechnName (

    @Param ('technName') technName: string,

  ): Promise<Order []> {

    return this.ordersService.getOrdersByTechnName (technName);

  }

  @Get (':id') 
  /*@Roles (Role.ADMIN, Role.CLIENT)
  @UseGuards (AuthGuard, RoleGuard)*/

  async getOrderById (@Param ('id') orderId: string): Promise<Order> {

    return this.ordersService.getOrderById (orderId);

  }

  @Post ('create')
  /*@Roles (Role.ADMIN)
  @UseGuards (AuthGuard, RoleGuard)*/

  async createOrder (@Body () createOrderDto: CreateOrderDto): Promise<Order> {

    return this.ordersService.createOrder (createOrderDto);

  }

  @Patch ('update/:id')

  async updateOrder (@Param ('id') id: string, @Body () updateOrderDto: UpdateOrderDto): Promise<Order> {
    
    return this.ordersService.updateOrder (id, updateOrderDto);

  }  

  /* Falso Delete*/
  @Put ('inactivate/:id')
  /*@Roles (Role.ADMIN)
  @UseGuards (AuthGuard, RoleGuard)*/

  async inactivedelete (

    @Param ('id') orderId: string,
    @Body () updateOrderDto: UpdateOrderDto,

  ): Promise<{ message: string }> {

    return this.ordersService.inactiveDelete (orderId, updateOrderDto);

  }

  @Put ('activate/:id')
  /*@Roles (Role.ADMIN)
  @UseGuards (AuthGuard, RoleGuard)*/

  async reactivateOrder (

    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,

  ): Promise<{ message: string }> {

    return this.ordersService.reactivateOrder (orderId, updateOrderDto);

  }
  

}
