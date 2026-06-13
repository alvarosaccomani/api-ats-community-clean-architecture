import { Request, Response } from "express";
import { ChatRoomUseCase } from "../../../application/chat-room/chat-room-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ChatRoomController {
    constructor(private chatRoomUseCase: ChatRoomUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid } = req.params;
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las salas de chat.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const rooms = await this.chatRoomUseCase.getChatRooms(cmp_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Salas de chat retornadas.',
                    ...paginator(rooms, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Salas de chat retornadas.',
                    data: rooms
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (chat room controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las salas de chat.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid } = req.params;
            if (!cmp_uuid || !chr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la sala de chat.',
                    error: 'Debe proporcionar cmp_uuid y chr_uuid.'
                });
            }
            const room = await this.chatRoomUseCase.getDetailChatRoom(cmp_uuid, chr_uuid);
            return res.status(200).send({
                success: true,
                message: 'Sala de chat retornada.',
                data: room
            });
        } catch (error: any) {
            console.error('Error en getCtrl (chat room controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la sala de chat.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, chr_name, chr_type } = body;
            if (!cmp_uuid || !chr_name || !chr_type) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo crear la sala de chat.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, chr_name, chr_type).'
                });
            }

            const room = await this.chatRoomUseCase.createChatRoom(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('chat-room:created', room);

            return res.status(200).json({
                success: true,
                message: 'Sala de chat creada.',
                data: room
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (chat room controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo crear la sala de chat.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !chr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la sala de chat.',
                    error: 'Debe proporcionar cmp_uuid y chr_uuid.'
                });
            }
            const room = await this.chatRoomUseCase.updateChatRoom(cmp_uuid, chr_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('chat-room:updated', room);

            return res.status(200).json({
                success: true,
                message: 'Sala de chat actualizada.',
                data: room
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (chat room controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la sala de chat.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid } = req.params;
            if (!cmp_uuid || !chr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la sala de chat.',
                    error: 'Debe proporcionar cmp_uuid y chr_uuid.'
                });
            }
            const room = await this.chatRoomUseCase.deleteChatRoom(cmp_uuid, chr_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('chat-room:deleted', room);

            return res.status(200).json({
                success: true,
                message: 'Sala de chat eliminada.',
                data: room
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (chat room controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la sala de chat.',
                error: error.message,
            });
        }
    }
}
