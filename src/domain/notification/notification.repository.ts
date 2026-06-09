import { NotificationEntity, NotificationUpdateData } from "./notification.entity";

export interface NotificationRepository {
    getNotifications(usr_uuid: string, cus_uuid: string): Promise<NotificationEntity[] | null>;
    findNotificationById(usr_uuid: string, cus_uuid: string, ntf_uuid: string): Promise<NotificationEntity | null>;
    createNotification(notification: NotificationEntity): Promise<NotificationEntity | null>;
    updateNotification(usr_uuid: string, cus_uuid: string, ntf_uuid: string, notification: NotificationUpdateData): Promise<NotificationEntity | null>;
    deleteNotification(usr_uuid: string, cus_uuid: string, ntf_uuid: string): Promise<NotificationEntity | null>;
}