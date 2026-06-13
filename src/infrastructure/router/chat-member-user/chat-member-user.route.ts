import { Express } from "express";
import { SequelizeRepository } from "../../repository/chat-member-user/sequelize-chat-member-user.repository";
import { ChatMemberUserUseCase } from "../../../application/chat-member-user/chat-member-user-use-case";
import { ChatMemberUserController } from "../../controller/chat-member-user/chat-member-user.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureChatMemberUserRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeChatMemberUserRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const chatMemberUserUseCase = new ChatMemberUserUseCase(sequelizeChatMemberUserRepository);
    
    /*
    *   Iniciar controller
    */
    const chatMemberUserCtrl = new ChatMemberUserController(chatMemberUserUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/chat-members/:cmp_uuid/:chr_uuid`, chatMemberUserCtrl.getAllCtrl);
    app.post(`/${process.env.BASE_URL_API}/chat-member`, chatMemberUserCtrl.insertCtrl);
    app.delete(`/${process.env.BASE_URL_API}/chat-member/:cmp_uuid/:chr_uuid/:usr_uuid`, chatMemberUserCtrl.deleteCtrl);
}

export default configureChatMemberUserRoutes;
