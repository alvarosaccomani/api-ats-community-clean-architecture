import { Request, Response } from "express";
import { ChatMemberUserUseCase } from "../../../application/chat-member-user/chat-member-user-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ChatMemberUserController {
    constructor(private chatMemberUserUseCase: ChatMemberUserUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid } = req.params;
            if (!cmp_uuid || !chr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los miembros de la sala.',
                    error: 'Debe proporcionar cmp_uuid y chr_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const members = await this.chatMemberUserUseCase.getChatMemberUsers(cmp_uuid, chr_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Miembros de la sala retornados.',
                    ...paginator(members, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Miembros de la sala retornados.',
                    data: members
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (chat member controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los miembros de la sala.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid, usr_uuid } = req.params;
            if (!cmp_uuid || !chr_uuid || !usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la membresía del chat.',
                    error: 'Debe proporcionar cmp_uuid, chr_uuid y usr_uuid.'
                });
            }
            const member = await this.chatMemberUserUseCase.getDetailChatMemberUser(cmp_uuid, chr_uuid, usr_uuid);
            return res.status(200).send({
                success: true,
                message: 'Miembro retornado.',
                data: member
            });
        } catch (error: any) {
            console.error('Error en getCtrl (chat member controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la membresía del chat.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid, usr_uuid } = body;
            if (!cmp_uuid || !chr_uuid || !usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo agregar al miembro.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, chr_uuid, usr_uuid).'
                });
            }

            const member = await this.chatMemberUserUseCase.createChatMemberUser(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitToRoom(chr_uuid, 'chat-member:joined', member);

            return res.status(200).json({
                success: true,
                message: 'Miembro agregado a la sala de chat.',
                data: member
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (chat member controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo agregar al miembro.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid, usr_uuid } = req.params;
            if (!cmp_uuid || !chr_uuid || !usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar al miembro.',
                    error: 'Debe proporcionar cmp_uuid, chr_uuid y usr_uuid.'
                });
            }
            const member = await this.chatMemberUserUseCase.deleteChatMemberUser(cmp_uuid, chr_uuid, usr_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitToRoom(chr_uuid, 'chat-member:left', member);

            return res.status(200).json({
                success: true,
                message: 'Miembro eliminado de la sala de chat.',
                data: member
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (chat member controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar al miembro.',
                error: error.message,
            });
        }
    }
}
