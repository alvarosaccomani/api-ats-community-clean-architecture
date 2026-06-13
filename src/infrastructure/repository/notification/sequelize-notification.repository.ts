import { NotificationEntity, NotificationUpdateData } from "../../../domain/notification/notification.entity";
import { NotificationRepository } from "../../../domain/notification/notification.repository";
import { SequelizeNotification } from "../../model/notification/notification.model";

export class SequelizeRepository implements NotificationRepository {
    async getNotifications(usr_uuid: string): Promise<NotificationEntity[] | null> {
        try {
            const notifications = await SequelizeNotification.findAll({
                where: {
                    usr_uuid: usr_uuid ?? null
                }
            });
            if (!notifications) {
                return null;
            }
            return notifications;
        } catch (error: any) {
            console.error('Error en getNotifications (repository):', error.message);
            throw error;
        }
    }

    async findNotificationById(usr_uuid: string, ntf_uuid: string): Promise<NotificationEntity | null> {
        try {
            const notification = await SequelizeNotification.findOne({
                where: {
                    usr_uuid: usr_uuid ?? null,
                    ntf_uuid: ntf_uuid ?? null
                }
            });
            if (!notification) {
                return null;
            }
            return notification.dataValues;
        } catch (error: any) {
            console.error('Error en findNotificationById (repository):', error.message);
            throw error;
        }
    }

    async createNotification(notification: NotificationEntity): Promise<NotificationEntity | null> {
        try {
            const { 
                usr_uuid, 
                ntf_uuid, 
                cmp_uuid, 
                ntf_title, 
                ntf_message, 
                ntf_type, 
                ntf_isread, 
                ntf_actionurl, 
                ntf_createdat 
            } = notification;
            
            const result = await SequelizeNotification.create({ 
                usr_uuid, 
                ntf_uuid, 
                cmp_uuid, 
                ntf_title, 
                ntf_message, 
                ntf_type, 
                ntf_isread, 
                ntf_actionurl, 
                ntf_createdat 
            });
            
            if (!result) {
                throw new Error(`No se pudo agregar la notificación`);
            }
            
            return result.dataValues as NotificationEntity;
        } catch (error: any) {
            console.error('Error en createNotification (repository):', error.message);
            throw error;
        }
    }

    async updateNotification(usr_uuid: string, ntf_uuid: string, notification: NotificationUpdateData): Promise<NotificationEntity | null> {
        try {
            const [updatedCount, [updatedNotification]] = await SequelizeNotification.update(
                {
                    cmp_uuid: notification.cmp_uuid,
                    ntf_title: notification.ntf_title,
                    ntf_message: notification.ntf_message,
                    ntf_type: notification.ntf_type,
                    ntf_isread: notification.ntf_isread
                },
                {
                    where: { usr_uuid, ntf_uuid },
                    returning: true,
                }
            );
            
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar la notificación`);
            }
            
            return updatedNotification.get({ plain: true }) as NotificationEntity;
        } catch (error: any) {
            console.error('Error en updateNotification (repository):', error.message);
            throw error;
        }
    }

    async deleteNotification(usr_uuid: string, ntf_uuid: string): Promise<NotificationEntity | null> {
        try {
            const notificationToDelete = await this.findNotificationById(usr_uuid, ntf_uuid);
            if (!notificationToDelete) {
                throw new Error(`No se ha encontrado la notificación a eliminar`);
            }
            
            const deletedCount = await SequelizeNotification.destroy({
                where: { usr_uuid, ntf_uuid }
            });
            
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar la notificación`);
            }
            
            return notificationToDelete;
        } catch (error: any) {
            console.error('Error en deleteNotification (repository):', error.message);
            throw error;
        }
    }
}
