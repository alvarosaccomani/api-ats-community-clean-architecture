import { Express } from "express";
import { SequelizeRepository } from "../../repository/claim/sequelize-claim.repository";
import { ClaimUseCase } from "../../../application/claim/claim-use-case";
import { ClaimController } from "../../controller/claim/claim.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureClaimRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeClaimRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const claimUseCase = new ClaimUseCase(sequelizeClaimRepository);
    
    /*
    *   Iniciar controller
    */
    const claimCtrl = new ClaimController(claimUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/claims/:cmp_uuid`, claimCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/claim/:cmp_uuid/:cla_uuid`, claimCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/claim`, claimCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/claim/:cmp_uuid/:cla_uuid`, claimCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/claim/:cmp_uuid/:cla_uuid`, claimCtrl.deleteCtrl);
}

export default configureClaimRoutes;
