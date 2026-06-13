import { Express } from "express";
import { SequelizeRepository } from "../../repository/vote/sequelize-vote.repository";
import { VoteUseCase } from "../../../application/vote/vote-use-case";
import { VoteController } from "../../controller/vote/vote.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureVoteRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeVoteRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const voteUseCase = new VoteUseCase(sequelizeVoteRepository);
    
    /*
    *   Iniciar controller
    */
    const voteCtrl = new VoteController(voteUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/votes/:cmp_uuid/:cla_uuid/:ten_uuid`, voteCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/vote/:cmp_uuid/:cla_uuid/:ten_uuid/:usr_uuid/:vto_uuid`, voteCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/vote`, voteCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/vote/:cmp_uuid/:cla_uuid/:ten_uuid/:usr_uuid/:vto_uuid`, voteCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/vote/:cmp_uuid/:cla_uuid/:ten_uuid/:usr_uuid/:vto_uuid`, voteCtrl.deleteCtrl);
}

export default configureVoteRoutes;
