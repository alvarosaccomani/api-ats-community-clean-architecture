import { Express } from "express";
import { SequelizeRepository } from "../../repository/claim-comment/sequelize-claim-comment.repository";
import { ClaimCommentUseCase } from "../../../application/claim-comment/claim-comment-use-case";
import { ClaimCommentController } from "../../controller/claim-comment/claim-comment.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureClaimCommentRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeClaimCommentRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const claimCommentUseCase = new ClaimCommentUseCase(sequelizeClaimCommentRepository);
    
    /*
    *   Iniciar controller
    */
    const claimCommentCtrl = new ClaimCommentController(claimCommentUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/claim-comments/:cmp_uuid/:cla_uuid`, claimCommentCtrl.getAllCtrl);
    app.post(`/${process.env.BASE_URL_API}/claim-comment`, claimCommentCtrl.insertCtrl);
}

export default configureClaimCommentRoutes;
