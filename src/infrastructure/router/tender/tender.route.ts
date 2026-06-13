import { Express } from "express";
import { SequelizeRepository } from "../../repository/tender/sequelize-tender.repository";
import { TenderUseCase } from "../../../application/tender/tender-use-case";
import { TenderController } from "../../controller/tender/tender.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureTenderRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeTenderRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const tenderUseCase = new TenderUseCase(sequelizeTenderRepository);
    
    /*
    *   Iniciar controller
    */
    const tenderCtrl = new TenderController(tenderUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/tenders/:cmp_uuid/:cla_uuid`, tenderCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/tender/:cmp_uuid/:cla_uuid/:ten_uuid`, tenderCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/tender`, tenderCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/tender/:cmp_uuid/:cla_uuid/:ten_uuid`, tenderCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/tender/:cmp_uuid/:cla_uuid/:ten_uuid`, tenderCtrl.deleteCtrl);
}

export default configureTenderRoutes;
