import { Express } from "express";
import { SequelizeRepository } from "../../repository/resource-type/sequelize-resource-type.repository";
import { ResourceTypeUseCase } from "../../../application/resource-type/resource-type-use-case";
import { ResourceTypeController } from "../../controller/resource-type/resource-type.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureResourceTypeRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeResourceTypeRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const resourceTypeUseCase = new ResourceTypeUseCase(sequelizeResourceTypeRepository);
    
    /*
    *   Iniciar controller
    */
    
    const resourceTypeCtrl = new ResourceTypeController(resourceTypeUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/resources-types/:filter?/:page?/:perPage?`, resourceTypeCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/resource-type/:rety_uuid`, resourceTypeCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/resource-type`, resourceTypeCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/resource-type/:rety_uuid`, resourceTypeCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/resource-type/:rety_uuid`, resourceTypeCtrl.deleteCtrl);
}

export default configureResourceTypeRoutes;
