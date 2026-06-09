import { Request, Response } from "express";
import { NotificationUseCase } from "../../../application/notification/notification-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class NotificationController {
    constructor(private notificationUseCase: NotificationUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta usr_uuid.' });
            }
            if (!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cus_uuid.' });
            }

            const notifications = await this.notificationUseCase.getNotifications(usr_uuid, cus_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Notificaciones retornadas con paginación.',
                    ...paginator(notifications, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Notificaciones retornadas.',
                    data: notifications
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - notification):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las notificaciones.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            const ntf_uuid = req.params.ntf_uuid;

            if (!usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta usr_uuid.' });
            }
            if (!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cus_uuid.' });
            }
            if (!ntf_uuid || ntf_uuid.toLowerCase() === 'null' || ntf_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta ntf_uuid.' });
            }

            const notification = await this.notificationUseCase.findNotificationById(usr_uuid, cus_uuid, ntf_uuid);
            return res.status(200).send({
                success: true,
                message: 'Notificación retornada.',
                data: notification
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - notification):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la notificación.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const usr_uuid = body.usr_uuid;
            const cus_uuid = body.cus_uuid;
            const cmp_uuid = body.cmp_uuid;
            const ntf_title = body.ntf_title;
            const ntf_message = body.ntf_message;
            const ntf_type = body.ntf_type;

            if (!usr_uuid) return res.status(400).json({ success: false, message: 'Falta usr_uuid.' });
            if (!cus_uuid) return res.status(400).json({ success: false, message: 'Falta cus_uuid.' });
            if (!cmp_uuid) return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            if (!ntf_title) return res.status(400).json({ success: false, message: 'Falta ntf_title.' });
            if (!ntf_message) return res.status(400).json({ success: false, message: 'Falta ntf_message.' });
            if (!ntf_type) return res.status(400).json({ success: false, message: 'Falta ntf_type.' });

            const notification = await this.notificationUseCase.createNotification(body);
            return res.status(200).json({
                success: true,
                message: 'Notificación registrada.',
                data: notification
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - notification):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar la notificación.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            const ntf_uuid = req.params.ntf_uuid;
            const update = req.body;

            if (!usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta usr_uuid.' });
            }
            if (!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cus_uuid.' });
            }
            if (!ntf_uuid || ntf_uuid.toLowerCase() === 'null' || ntf_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta ntf_uuid.' });
            }

            const notification = await this.notificationUseCase.updateNotification(usr_uuid, cus_uuid, ntf_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Notificación actualizada.',
                data: notification
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - notification):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la notificación.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            const ntf_uuid = req.params.ntf_uuid;

            if (!usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta usr_uuid.' });
            }
            if (!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cus_uuid.' });
            }
            if (!ntf_uuid || ntf_uuid.toLowerCase() === 'null' || ntf_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta ntf_uuid.' });
            }

            const notification = await this.notificationUseCase.deleteNotification(usr_uuid, cus_uuid, ntf_uuid);
            return res.status(200).json({
                success: true,
                message: 'Notificación eliminada.',
                data: notification
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - notification):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la notificación.',
                error: error.message,
            });
        }
    }
}
