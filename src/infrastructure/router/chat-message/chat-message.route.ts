import { Express } from "express";
import { SequelizeRepository } from "../../repository/chat-message/sequelize-chat-message.repository";
import { ChatMessageUseCase } from "../../../application/chat-message/chat-message-use-case";
import { ChatMessageController } from "../../controller/chat-message/chat-message.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureChatMessageRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeChatMessageRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const chatMessageUseCase = new ChatMessageUseCase(sequelizeChatMessageRepository);
    
    /*
    *   Iniciar controller
    */
    const chatMessageCtrl = new ChatMessageController(chatMessageUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/chat-messages/:cmp_uuid/:chr_uuid`, chatMessageCtrl.getAllCtrl);
    app.post(`/${process.env.BASE_URL_API}/chat-message`, chatMessageCtrl.insertCtrl);
}

export default configureChatMessageRoutes;
