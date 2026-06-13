import { Request, Response } from "express";
import { ClaimCommentUseCase } from "../../../application/claim-comment/claim-comment-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class ClaimCommentController {
    constructor(
        private claimCommentUseCase: ClaimCommentUseCase,
        private socketAdapter: SocketAdapter
    ) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los comentarios del reclamo.',
                    error: 'Debe proporcionar cmp_uuid y cla_uuid.'
                });
            }

            const comments = await this.claimCommentUseCase.getComments(cmp_uuid, cla_uuid);
            return res.status(200).send({
                success: true,
                message: 'Comentarios del reclamo retornados.',
                data: comments
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (claim comment controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los comentarios del reclamo.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, usr_uuid, clac_text } = body;
            if (!cmp_uuid || !cla_uuid || !usr_uuid || !clac_text) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el comentario del reclamo.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, cla_uuid, usr_uuid, clac_text).'
                });
            }

            const comment = await this.claimCommentUseCase.createComment(body);

            // Fetch the user information to append to the socket event so the UI gets the author details
            // For socket broadcast, we can append the author details or let the client query if needed,
            // but wait, it is much better if we include usr details in the socket event!
            // Let's do a quick query or let the frontend know. If the client gets the socket notification,
            // they can reload or we can enrich it. Let's send the created comment.
            // Wait, we can fetch all comments and pick the created one to get user info, or just send the comment.
            // Let's query the comments and find the one with this clac_uuid to get the usr relation!
            const allComments = await this.claimCommentUseCase.getComments(cmp_uuid, cla_uuid);
            const enrichedComment = allComments?.find(c => c.clac_uuid === comment.clac_uuid) || comment;

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim-comment:created', enrichedComment);

            return res.status(200).json({
                success: true,
                message: 'Comentario del reclamo insertado.',
                data: enrichedComment
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (claim comment controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el comentario del reclamo.',
                error: error.message,
            });
        }
    }
}
