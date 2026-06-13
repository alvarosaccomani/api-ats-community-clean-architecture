import { Express } from "express";
import { SequelizeRepository } from "../../repository/unit/sequelize-unit.repository";
import { UnitUseCase } from "../../../application/unit/unit-use-case";
import { UnitController } from "../../controller/unit/unit.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureUnitRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeUnitRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const unitUseCase = new UnitUseCase(sequelizeUnitRepository);
    
    /*
    *   Iniciar controller
    */
    const unitCtrl = new UnitController(unitUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/units/:cmp_uuid`, unitCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/unit/:cmp_uuid/:uni_uuid`, unitCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/unit`, unitCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/unit/:cmp_uuid/:uni_uuid`, unitCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/unit/:cmp_uuid/:uni_uuid`, unitCtrl.deleteCtrl);
}

export default configureUnitRoutes;
