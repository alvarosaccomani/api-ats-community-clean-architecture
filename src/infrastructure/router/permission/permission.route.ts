import { Express } from "express";
import { SequelizeRepository } from "../../repository/permission/sequelize-permission.repository";
import { PermissionUseCase } from "../../../application/permission/permission-use-case";
import { PermissionController } from "../../controller/permission/permission.controller";
import SocketAdapter from "../../services/socketAdapter";

function configurePermissionRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizePermissionRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const permissionUseCase = new PermissionUseCase(sequelizePermissionRepository);
    
    /*
    *   Iniciar controller
    */
    
    const permissionCtrl = new PermissionController(permissionUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/permissions/:filter?/:page?/:perPage?`, permissionCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/permission/:per_uuid`, permissionCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/permission`, permissionCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/permission/:per_uuid`, permissionCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/permission/:per_uuid`, permissionCtrl.deleteCtrl);
}

export default configurePermissionRoutes;