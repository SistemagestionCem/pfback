import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "./notifications.repository";
import { CreateNotificationDto } from "src/dto/notification/notification.dto";
import { Cron } from "@nestjs/schedule";
import { MailService } from "../mail/mail.service";

@Injectable()
export class NotificationService{
    constructor(private readonly notificationRepository: NotificationsRepository,
            private readonly mailService: MailService,
    ){}

      //* 🔹 Recordatorio para aceptar el presupuesto (cada 3 min, hasta 3 intentos)
  @Cron("*/3 * * * *") // ✅ Cada 3 minutos
  async remindBudgetAcceptance() {
    console.log('Ejecutando recordatorio de aceptación de presupuesto...');

    const pendingOrders = await this.notificationRepository.getPendingOrders();
    
    for (const order of pendingOrders) {
      const notificationsCount = await this.notificationRepository.countNotifications(order.id);
      
      if (notificationsCount < 4) {
        await this.mailService.sendNotificationEmail(
          order.clientEmail,
          `Estimado cliente, aún no hemos recibido su confirmación sobre la reparación de su equipo. Por favor, responda para proceder.`,
        );
        
        await this.notificationRepository.createBudgetReminder(order);
        console.log(`📧 Notificación enviada a ${order.clientEmail}`);
      }
    }
  }



    async create(createNotificationDto: CreateNotificationDto){
        return this.notificationRepository.create(createNotificationDto)
    }

    async findAll(){
        return this.notificationRepository.findAll()
    }

    async findByOrder(orderId: string){
        return this.notificationRepository.findByOrder(orderId)
    }

    async findOne(id: string){
        return this.notificationRepository.findOne(id)
    }

    async findByClientDni(dni){
        return this.notificationRepository.findByClientDni(dni)
    }

    async resendNotification(id: string){
        return this.notificationRepository.resendNotification(id)
    }

    async delete(id: string){
        return this.notificationRepository.delete(id)
    }

    async deleteByOrder(id: string){
        return this.notificationRepository.deleteByOrder(id)
    }
}