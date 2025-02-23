import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationType } from './Notification.entity';
import { Repository } from 'typeorm';
import { Order } from '../orders/Order.entity';
import { CreateNotificationDto } from 'src/dto/notification/notification.dto';
import { MailService } from '../mail/mail.service';
import { OrderStatus } from 'src/enum/orderstatus.enum';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly mailService: MailService,
  ) {}
  //* funciones adicionales para remindBudgetAcceptance
  async getRevisionOrders() {
    return this.orderRepository.find({ where: { status: OrderStatus.REVISION } });
  }

  async countNotifications(orderId: string) {
    return this.notificationRepository.count({
      where: { order: { id: orderId }, type: NotificationType.BUDGET_REMINDER },
    });
  }

  async createBudgetReminder(order: Order) {
    const notification = this.notificationRepository.create({
      order,
      type: NotificationType.BUDGET_REMINDER,
      message: 'Recordatorio de aceptación de presupuesto',
    });
    return this.notificationRepository.save(notification);
  }

  //* Notificación de cambio de estado (cuando la orden cambia)
  async notifyStatusChange(order: Order) {
    const statusMessageMap = {
    [OrderStatus.REVISION]: 
      'Su equipo está en revisión. Pronto un presupuesto del servicio estara anclado a su orden para su aprobación.',
    [OrderStatus.CONFIRMADO]: 
      'Su orden ha sido confirmada. Se procederá con el inicio del servicio. Gracias por la confianza',
    [OrderStatus.CANCELADO]: 
      'Su orden ha sido cancelada. Si necesita asistencia, por favor contáctenos.',
    [OrderStatus.REPARACION]: 
      'Su equipo está siendo reparado. Le notificaremos cuando el proceso haya finalizado.',
    [OrderStatus.FINALIZADO]: 
      'La reparación de su equipo ha sido completada. Puede proceder con el pago para su entrega.',
    [OrderStatus.PAGO]: 
      'Hemos recibido su pago. Su equipo está listo para ser retirado en nuestra tienda.',
    [OrderStatus.RETIRADO]: 
      'Su equipo ha sido retirado. Gracias por confiar en nuestro servicio.',
  
    };

    const latestStatus = order.status;
    if (statusMessageMap[latestStatus]) {
      await this.mailService.sendNotificationEmail(
        order.clientEmail,
        `📢 Estado actualizado: ${statusMessageMap[latestStatus]}`,
      );

      // Registrar la notificación en la base de datos
      const notification = this.notificationRepository.create({
        order,
        type: NotificationType.STATUS_UPDATE,
        message: statusMessageMap[latestStatus],
      });
      await this.notificationRepository.save(notification);
    }
  }

  //* logica CRUD de notificaciones
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const order = await this.orderRepository.findOne({
      where: { id: createNotificationDto.orderId },
    });

    if (!order) {
      throw new NotFoundException('La orden no existe');
    }

    const notification = this.notificationRepository.create({
      message: createNotificationDto.message,
      order,
    });

    await this.notificationRepository.save(notification);

    // logica de notificacion por email, Enviar email al cliente
    if (order.clientEmail) {
      try {
        await this.mailService.sendNotificationEmail(
          order.clientEmail,
          createNotificationDto.message,
        );
      } catch (error) {
        throw new BadRequestException('error al notificar por email: ' + error);
      }
    } else {
      throw new BadRequestException(
        'No se pudo enviar el email porque no hay un correo registrado',
      );
    }

    // 4. Devolver la notificación y un mensaje de éxito
    return notification;
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      relations: ['order'],
    });
    if (!notifications) {
      throw new NotFoundException('notifications not found');
    }
    return notifications;
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!notification) {
      throw new NotFoundException('Notificación no encontrada');
    }
    return notification;
  }

  async findByOrder(orderId: string): Promise<Notification[]> {
    const notificationByOrder = await this.notificationRepository.find({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
    if (!notificationByOrder) {
      throw new NotFoundException('notification by orderId not found');
    }
    return notificationByOrder;
  }

  async findByClientDni(dni: string): Promise<Notification[]> {
    const notificationByDni = await this.notificationRepository
      .createQueryBuilder('notification')
      .innerJoin('notification.order', 'order')
      .where('order.clientDni = :dni', { dni })
      .getMany();
    if (!notificationByDni) {
      throw new NotFoundException('notification by dni not found');
    }
    return notificationByDni;
  }

  async resendNotification(id: string): Promise<string> {
    const notification = await this.notificationRepository.findOne({
      where: { id: id },
      relations: ['order'],
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Simulación de reenvío
    if (notification.order && notification.order.clientEmail) {
      await this.mailService.sendNotificationEmail(
        notification.order.clientEmail,
        notification.message,
      );
      return `Notificación reenviada con éxito al cliente.`;
    } else {
      throw new BadRequestException('ERROR: notification not resended');
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('notification not found');
    }
  }

  async deleteByOrder(orderId: string): Promise<void> {
    const result = await this.notificationRepository.delete({
      order: { id: orderId },
    });
    if (result.affected === 0) {
      throw new NotFoundException('notification by orderID not found');
    }
  }
}
