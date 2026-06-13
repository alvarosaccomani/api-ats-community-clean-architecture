import { NotificationRepository } from "../../domain/notification/notification.repository";
import { NotificationValue } from "../../domain/notification/notification.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class NotificationUseCase {
    constructor(
        private readonly notificationRepository: NotificationRepository
    ) {
        this.getNotifications = this.getNotifications.bind(this);
        this.findNotificationById = this.findNotificationById.bind(this);
        this.createNotification = this.createNotification.bind(this);
        this.updateNotification = this.updateNotification.bind(this);
        this.deleteNotification = this.deleteNotification.bind(this);
    }

    public async getNotifications(usr_uuid: string) {
        try {
            const notifications = await this.notificationRepository.getNotifications(usr_uuid);
            if (!notifications) {
                return [];
            }
            return notifications.map(notification => ({
                usr_uuid: notification.usr_uuid,
                ntf_uuid: notification.ntf_uuid,
                cmp_uuid: notification.cmp_uuid,
                ntf_title: notification.ntf_title,
                ntf_message: notification.ntf_message,
                ntf_type: notification.ntf_type,
                ntf_isread: notification.ntf_isread,
                ntf_actionurl: notification.ntf_actionurl,
                ntf_createdat: notification.ntf_createdat ? TimezoneConverter.toIsoStringInTimezone(notification.ntf_createdat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getNotifications (use case):', error.message);
            throw error;
        }
    }

    public async findNotificationById(usr_uuid: string, ntf_uuid: string) {
        try {
            const notification = await this.notificationRepository.findNotificationById(usr_uuid, ntf_uuid);
            if (!notification) {
                throw new Error(`No se encontró la notificación.`);
            }
            return {
                usr_uuid: notification.usr_uuid,
                ntf_uuid: notification.ntf_uuid,
                cmp_uuid: notification.cmp_uuid,
                ntf_title: notification.ntf_title,
                ntf_message: notification.ntf_message,
                ntf_type: notification.ntf_type,
                ntf_isread: notification.ntf_isread,
                ntf_actionurl: notification.ntf_actionurl,
                ntf_createdat: notification.ntf_createdat ? TimezoneConverter.toIsoStringInTimezone(notification.ntf_createdat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findNotificationById (use case):', error.message);
            throw error;
        }
    }

    public async createNotification(data: { usr_uuid: string, ntf_uuid?: string, cmp_uuid: string, ntf_title: string, ntf_message: string, ntf_type: string, ntf_isread: boolean, ntf_actionurl: string }) {
        try {
            const notificationValue = new NotificationValue(data);
            const notificationCreated = await this.notificationRepository.createNotification(notificationValue);
            if (!notificationCreated) {
                throw new Error(`No se pudo crear la notificación.`);
            }

            return {
                usr_uuid: notificationCreated.usr_uuid,
                ntf_uuid: notificationCreated.ntf_uuid,
                cmp_uuid: notificationCreated.cmp_uuid,
                ntf_title: notificationCreated.ntf_title,
                ntf_message: notificationCreated.ntf_message,
                ntf_type: notificationCreated.ntf_type,
                ntf_isread: notificationCreated.ntf_isread,
                ntf_actionurl: notificationCreated.ntf_actionurl,
                ntf_createdat: notificationCreated.ntf_createdat ? TimezoneConverter.toIsoStringInTimezone(notificationCreated.ntf_createdat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createNotification (use case):', error.message);
            throw error;
        }
    }

    public async updateNotification(usr_uuid: string, ntf_uuid: string, data: { cmp_uuid: string, ntf_title: string, ntf_message: string, ntf_type: string, ntf_isread: boolean }) {
        try {
            const notificationUpdated = await this.notificationRepository.updateNotification(usr_uuid, ntf_uuid, data);
            if (!notificationUpdated) {
                throw new Error(`No se pudo actualizar la notificación.`);
            }

            return {
                usr_uuid: notificationUpdated.usr_uuid,
                ntf_uuid: notificationUpdated.ntf_uuid,
                cmp_uuid: notificationUpdated.cmp_uuid,
                ntf_title: notificationUpdated.ntf_title,
                ntf_message: notificationUpdated.ntf_message,
                ntf_type: notificationUpdated.ntf_type,
                ntf_isread: notificationUpdated.ntf_isread,
                ntf_actionurl: notificationUpdated.ntf_actionurl,
                ntf_createdat: notificationUpdated.ntf_createdat ? TimezoneConverter.toIsoStringInTimezone(notificationUpdated.ntf_createdat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateNotification (use case):', error.message);
            throw error;
        }
    }

    public async deleteNotification(usr_uuid: string, ntf_uuid: string) {
        try {
            const notificationDeleted = await this.notificationRepository.deleteNotification(usr_uuid, ntf_uuid);
            if (!notificationDeleted) {
                throw new Error(`No se pudo eliminar la notificación.`);
            }

            return {
                usr_uuid: notificationDeleted.usr_uuid,
                ntf_uuid: notificationDeleted.ntf_uuid,
                cmp_uuid: notificationDeleted.cmp_uuid,
                ntf_title: notificationDeleted.ntf_title,
                ntf_message: notificationDeleted.ntf_message,
                ntf_type: notificationDeleted.ntf_type,
                ntf_isread: notificationDeleted.ntf_isread,
                ntf_actionurl: notificationDeleted.ntf_actionurl,
                ntf_createdat: notificationDeleted.ntf_createdat ? TimezoneConverter.toIsoStringInTimezone(notificationDeleted.ntf_createdat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteNotification (use case):', error.message);
            throw error;
        }
    }
}
