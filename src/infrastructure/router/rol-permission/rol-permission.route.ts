import { Express } from "express";
import { SequelizeRepository } from "../../repository/rol-permission/sequelize-rol-permission.repository";
import { RolPermissionUseCase } from "../../../application/rol-permission/rol-permission-use-case";
import { RolPermissionController } from "../../controller/rol-permission/rol-permission.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureRolPermissionRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeRolPermissionRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const rolPermissionUseCase = new RolPermissionUseCase(sequelizeRolPermissionRepository);
    
    /*
    *   Iniciar controller
    */
    
    const rolPermissionCtrl = new RolPermissionController(rolPermissionUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/rol-permissions/:filter?/:page?/:perPage?`, rolPermissionCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/rol-permission/:rol_uuid/:per_uuid`, rolPermissionCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/rol-permission`, rolPermissionCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/rol-permission/:rol_uuid/:per_uuid`, rolPermissionCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/rol-permission/:rol_uuid/:per_uuid`, rolPermissionCtrl.deleteCtrl);
    app.get(`/${process.env.BASE_URL_API}/rol-permissions-by-role/:rol_uuid`, rolPermissionCtrl.getRolPermissionsByRolCtrl);
    app.get(`/${process.env.BASE_URL_API}/rol-permissions-by-permission/:per_uuid`, rolPermissionCtrl.getRolPermissionsByPermissionCtrl);
}

export default configureRolPermissionRoutes;
