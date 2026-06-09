import { Express } from "express";
import { SequelizeRepository } from "../../repository/resource-module/sequelize-resource-module.repository";
import { ResourceModuleUseCase } from "../../../application/resource-module/resource-module-use-case";
import { ResourceModuleController } from "../../controller/resource-module/resource-module.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureResourceModuleRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeResourceModuleRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const resourceModuleUseCase = new ResourceModuleUseCase(sequelizeResourceModuleRepository);
    
    /*
    *   Iniciar controller
    */
    
    const resourceModuleCtrl = new ResourceModuleController(resourceModuleUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/resources-modules/:filter?/:page?/:perPage?`, resourceModuleCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/resource-module/:remo_uuid`, resourceModuleCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/resource-module`, resourceModuleCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/resource-module/:remo_uuid`, resourceModuleCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/resource-module/:remo_uuid`, resourceModuleCtrl.deleteCtrl);
}

export default configureResourceModuleRoutes;
