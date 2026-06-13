import { Request, Response } from "express";
import { ChatMessageUseCase } from "../../../application/chat-message/chat-message-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ChatMessageController {
    constructor(private chatMessageUseCase: ChatMessageUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid } = req.params;
            if (!cmp_uuid || !chr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los mensajes.',
                    error: 'Debe proporcionar cmp_uuid y chr_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const messages = await this.chatMessageUseCase.getChatMessages(cmp_uuid, chr_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Mensajes retornados.',
                    ...paginator(messages, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Mensajes retornados.',
                    data: messages
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (chat message controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los mensajes.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, chr_uuid, usr_uuid, chrmsg_text } = body;
            if (!cmp_uuid || !chr_uuid || !usr_uuid || !chrmsg_text) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo enviar el mensaje.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, chr_uuid, usr_uuid, chrmsg_text).'
                });
            }

            // Registrar el mensaje en la base de datos
            const message = await this.chatMessageUseCase.createChatMessage({
                ...body,
                chrmsg_isread: false
            });

            // Emitir en tiempo real a los miembros de la sala utilizando emitToRoom
            this.socketAdapter.emitToRoom(chr_uuid, 'message:received', message);

            return res.status(200).json({
                success: true,
                message: 'Mensaje enviado.',
                data: message
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (chat message controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo enviar el mensaje.',
                error: error.message,
            });
        }
    }
}
