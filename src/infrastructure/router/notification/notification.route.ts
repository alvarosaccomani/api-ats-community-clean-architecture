import { Express } from "express";
import { SequelizeRepository as SequelizeNotificationRepository } from "../../repository/notification/sequelize-notification.repository";
import { NotificationUseCase } from "../../../application/notification/notification-use-case";
import { NotificationController } from "../../controller/notification/notification.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureNotificationRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeNotificationRepository = new SequelizeNotificationRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const notificationUseCase = new NotificationUseCase(sequelizeNotificationRepository);
    
    /*
    *   Iniciar controller
    */
    const notificationCtrl = new NotificationController(notificationUseCase, socketAdapter);
    
    // Rutas de consulta de colecciones (todas las notificaciones para un usuario de un cliente particular)
    app.get(`/${process.env.BASE_URL_API}/notifications/:usr_uuid/:page?/:perPage?`, notificationCtrl.getAllCtrl);
    
    // Consulta individual por PK compuesta de 3 columnas
    app.get(`/${process.env.BASE_URL_API}/notification/:usr_uuid/:ntf_uuid`, notificationCtrl.getCtrl);
    
    // Registro individual
    app.post(`/${process.env.BASE_URL_API}/notification`, notificationCtrl.insertCtrl);
    
    // Edición y borrado por PK compuesta de 3 columnas
    app.put(`/${process.env.BASE_URL_API}/notification/:usr_uuid/:ntf_uuid`, notificationCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/notification/:usr_uuid/:ntf_uuid`, notificationCtrl.deleteCtrl);
}

export default configureNotificationRoutes;
