import { Express } from "express";
import { SequelizeRepository } from "../../repository/tender-option/sequelize-tender-option.repository";
import { TenderOptionUseCase } from "../../../application/tender-option/tender-option-use-case";
import { TenderOptionController } from "../../controller/tender-option/tender-option.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureTenderOptionRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeTenderOptionRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const tenderOptionUseCase = new TenderOptionUseCase(sequelizeTenderOptionRepository);
    
    /*
    *   Iniciar controller
    */
    const tenderOptionCtrl = new TenderOptionController(tenderOptionUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/tender-options/:cmp_uuid/:cla_uuid/:ten_uuid`, tenderOptionCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/tender-option/:cmp_uuid/:cla_uuid/:ten_uuid/:tenopt_uuid`, tenderOptionCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/tender-option`, tenderOptionCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/tender-option/:cmp_uuid/:cla_uuid/:ten_uuid/:tenopt_uuid`, tenderOptionCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/tender-option/:cmp_uuid/:cla_uuid/:ten_uuid/:tenopt_uuid`, tenderOptionCtrl.deleteCtrl);
}

export default configureTenderOptionRoutes;
