import { Express } from "express";
import { SequelizeRepository } from "../../repository/rol/sequelize-rol.repository";
import { RolUseCase } from "../../../application/rol/rol-use-case";
import { RolController } from "../../controller/rol/rol.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureRolRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeRolRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const rolUseCase = new RolUseCase(sequelizeRolRepository);
    
    /*
    *   Iniciar controller
    */
    
    const rolCtrl = new RolController(rolUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/roles/:filter?/:page?/:perPage?`, rolCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/rol/:rol_uuid`, rolCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/rol`, rolCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/rol/:rol_uuid`, rolCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/rol/:rol_uuid`, rolCtrl.deleteCtrl);
}

export default configureRolRoutes;