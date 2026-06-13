import { Express } from "express";
import { SequelizeRepository } from "../../repository/chat-room/sequelize-chat-room.repository";
import { ChatRoomUseCase } from "../../../application/chat-room/chat-room-use-case";
import { ChatRoomController } from "../../controller/chat-room/chat-room.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureChatRoomRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeChatRoomRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const chatRoomUseCase = new ChatRoomUseCase(sequelizeChatRoomRepository);
    
    /*
    *   Iniciar controller
    */
    const chatRoomCtrl = new ChatRoomController(chatRoomUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/chat-rooms/:cmp_uuid`, chatRoomCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/chat-room/:cmp_uuid/:chr_uuid`, chatRoomCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/chat-room`, chatRoomCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/chat-room/:cmp_uuid/:chr_uuid`, chatRoomCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/chat-room/:cmp_uuid/:chr_uuid`, chatRoomCtrl.deleteCtrl);
}

export default configureChatRoomRoutes;
