

import {

  BadRequestException,
  Injectable,
  NotFoundException,

} from '@nestjs/common';

import { OrdersRepository } from './orders.repository';
import { UsersRepository } from '../users/users.repository';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { Role } from 'src/enum/Role.enum';

@Injectable ()

export class OrdersService {

  constructor (

    private readonly ordersRepository: OrdersRepository,
    private readonly usersRepository: UsersRepository,

  ) {}

  async getAllOrders (): Promise<Order []> {

    const orders = await this.ordersRepository.getAllOrders () || [];
  
    if (!orders.length) {

      throw new NotFoundException ('No hay órdenes registradas');

    }
  
    return orders;

  }  

  async getOrdersByClientEmail (clientEmail: string): Promise<Order []> {

    const orders = await this.ordersRepository.getOrdersByClientEmail (clientEmail) || [];
  
    if (!orders.length) {

      throw new NotFoundException (`No hay órdenes registradas para el cliente con email "${clientEmail}"`);

    }
  
    return orders;

  }

  async getOrdersByTechnName (technName: string): Promise<Order[]> {

    const orders = await this.ordersRepository.getOrdersByTechnName (technName) || [];

    if (!orders.length) {

      throw new NotFoundException (`No hay órdenes registradas para el técnico con nombre "${technName}"`);

    }

    return orders;

  }

  async getOrderById (orderId: string): Promise<Order> {

    const order = await this.ordersRepository.getOrderById (orderId);

    if (!order) {

      throw new NotFoundException (`No se encontró la orden con ID "${orderId}"`);

    }

    return order;
    
  }

  async createOrder (createOrderDto: CreateOrderDto): Promise<Order> {

    const { clientEmail, clientDni, technName, equipmentType, imei, description, status, adminName } = createOrderDto;
      
    const assignedTechnician = await this.usersRepository.findByRole (technName, Role.TECHN);

    if (!assignedTechnician) {

      throw new NotFoundException ('Técnico no encontrado.');

    }

    const admin = await this.usersRepository.findByRole (adminName, Role.ADMIN);

    if (!admin) {

      throw new NotFoundException ('El usuario que crea la orden debe ser un administrador.');

    }

    const currentDate = new Date ();    

    const orderData: Partial<Order> = {

      clientEmail: clientEmail || '',
      clientDni: clientDni || null,
      assignedTechn: assignedTechnician,
      equipmentType: equipmentType || null,
      imei: imei || '',
      description: description || '',
      status: status || null,
      statusHistory: [],
      statusWithDate: status ? { status: status, date: currentDate } : null,
      isActive: true,
      Admin: admin,

    };

    const newOrder = await this.ordersRepository.createOrder (orderData);
    return this.ordersRepository.saveOrder1 (newOrder);

  }  

  async updateOrder (id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {

    const order = await this.ordersRepository.getOrderById (id);
  
    if (!order) {

      throw new NotFoundException (`Orden con ID ${id} no encontrada.`);

    }

    const { isActive: _isActive, createdAt: __createdAt, ...allowedUpdates } = updateOrderDto;
  
    if (allowedUpdates.status) {

      const now = new Date ();
  
      order.statusWithDate = {

        status: allowedUpdates.status,
        date: now,

      };
  
      order.statusHistory = [...(order.statusHistory || []), { status: allowedUpdates.status, date: now }];
        
    }
  
    Object.assign (order, allowedUpdates);
  
    await this.ordersRepository.saveOrder1 (order);
  
    return this.ordersRepository.getOrderById (id);
  
  }  

  async inactiveDelete (id: string, { isActive }: UpdateOrderDto): Promise<{ message: string }> {

    const order = await this.ordersRepository.findOrderById (id);
  
    if (!order) {

      throw new NotFoundException (`Orden con ID ${id} no encontrada.`);

    }

    if (!order.isActive) {

      throw new BadRequestException (`La orden ya está inactiva.`);

    }
  
    if (isActive === false) {

      await this.ordersRepository.updateOrder (id, { isActive: false });
      return { message: `Orden con ID ${id} ha sido inactivada correctamente.` };

      }
  
    throw new BadRequestException (`El estado enviado no es válido.`);  

  }

  async reactivateOrder (id: string, { isActive }: UpdateOrderDto): Promise<{ message: string }> {

    const order = await this.ordersRepository.findOrderById (id);
  
    if (!order) {

      throw new NotFoundException (`Orden con ID ${id} no encontrada.`);

    }
  
    if (order.isActive) {

      throw new BadRequestException (`La orden ya está activa.`);

    }
  
    if (isActive === true) {

      await this.ordersRepository.updateOrder (id, { isActive: true });
      return { message: `Orden con ID ${id} ha sido activada correctamente.` };

    }
  
    throw new BadRequestException (`El estado enviado no es válido.`);

  }  

}
