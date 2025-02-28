

/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';

@Injectable ()

export class OrdersRepository  {

  constructor (

    @InjectRepository (Order)
    private readonly ordersRepository: Repository<Order>,

  ) {}  

  async getAllOrders (): Promise<Order []> {

    return this.ordersRepository.find ({

      order: { createdAt: 'DESC' }, 
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],
    
    });    

  }

  async getOrdersByClientEmail (clientEmail: string): Promise<Order []> {

    return this.ordersRepository.find ({ where: { clientEmail },

      order: { createdAt: 'DESC' }, 
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],     
    
    });

  }

  async getOrdersByTechnName (technName: string): Promise<Order []> {

    return this.ordersRepository.find ({

      where: {

        assignedTechn: { name: technName }

      },

      order: { createdAt: 'DESC' },

      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment']

    });  
          
  }   

  async getOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }

  async createOrder (orderData: Partial<Order>): Promise<Order> {

    const order = this.ordersRepository.create (orderData);   
    await this.ordersRepository.insert (order); 
    
    return this.ordersRepository.findOne ({

      where: { id: order.id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }     

  async findOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id },      
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }  

  async saveOrder1 (order: Order): Promise<Order> {

    const savedOrder = await this.ordersRepository.save (order);
  
    return this.ordersRepository.findOne ({

      where: { id: savedOrder.id },      
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }  

  async updateOrder (id: string, updateData: Partial<Order>): Promise<Order> {
  
    await this.ordersRepository.update (id, updateData);
  
    return this.ordersRepository.findOne ({

      where: { id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }  

  async findOne (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });
  
  } 

}*/

/**********/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';

@Injectable ()

export class OrdersRepository  {

  constructor (

    @InjectRepository (Order)
    private readonly ordersRepository: Repository<Order>,

  ) {}  

  async getAllOrders (): Promise<Order []> {

    return this.ordersRepository.find ({

      order: { createdAt: 'DESC' }, 
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],
    
    });    

  }

  async getOrdersByClientEmail (clientEmail: string): Promise<Order []> {

    return this.ordersRepository.find ({ where: { clientEmail },

      order: { createdAt: 'DESC' }, 
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],     
    
    });

  }

  async getOrdersByTechnId (technId: string): Promise<Order []> {

    return this.ordersRepository.find ({

      where: {

        assignedTechn: { id: technId }

      },

      order: { createdAt: 'DESC' },

      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment']

    });  
          
  }   

  async getOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }

  async createOrder (orderData: Partial<Order>): Promise<Order> {

    const order = this.ordersRepository.create (orderData);   
    await this.ordersRepository.insert (order); 
    
    return this.ordersRepository.findOne ({

      where: { id: order.id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }     

  async findOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id },      
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }  

  async saveOrder1 (order: Order): Promise<Order> {

    const savedOrder = await this.ordersRepository.save (order);
  
    return this.ordersRepository.findOne ({

      where: { id: savedOrder.id },      
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }  

  async updateOrder (id: string, updateData: Partial<Order>): Promise<Order> {
  
    await this.ordersRepository.update (id, updateData);
  
    return this.ordersRepository.findOne ({

      where: { id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });

  }  

  async findOne (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id },
      relations: ['assignedTechn', 'Admin', 'evidences', 'notifications', 'payment'],

    });
  
  } 

}

/**********/





