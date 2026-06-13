import { Express } from "express";
import { SequelizeRepository } from "../../repository/claim-image/sequelize-claim-image.repository";
import { ClaimImageUseCase } from "../../../application/claim-image/claim-image-use-case";
import { ClaimImageController } from "../../controller/claim-image/claim-image.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureClaimImageRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeClaimImageRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const claimImageUseCase = new ClaimImageUseCase(sequelizeClaimImageRepository);
    
    /*
    *   Iniciar controller
    */
    const claimImageCtrl = new ClaimImageController(claimImageUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/claim-images/:cmp_uuid/:cla_uuid`, claimImageCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/claim-image/:cmp_uuid/:cla_uuid/:claimg_uuid`, claimImageCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/claim-image`, claimImageCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/claim-image/:cmp_uuid/:cla_uuid/:claimg_uuid`, claimImageCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/claim-image/:cmp_uuid/:cla_uuid/:claimg_uuid`, claimImageCtrl.deleteCtrl);
}

export default configureClaimImageRoutes;
