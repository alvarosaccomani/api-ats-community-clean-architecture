import { Request, Response } from "express";
import { VoteUseCase } from "../../../application/vote/vote-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class VoteController {
    constructor(private voteUseCase: VoteUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los votos.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y ten_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const votes = await this.voteUseCase.getVotes(cmp_uuid, cla_uuid, ten_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Votos retornados.',
                    ...paginator(votes, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Votos retornados.',
                    data: votes
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (vote controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los votos.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !usr_uuid || !vto_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el voto.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const vote = await this.voteUseCase.getDetailVote(cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid);
            return res.status(200).send({
                success: true,
                message: 'Voto retornado.',
                data: vote
            });
        } catch (error: any) {
            console.error('Error en getCtrl (vote controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el voto.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, usr_uuid, tenopt_uuid } = body;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !usr_uuid || !tenopt_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo registrar el voto.',
                    error: 'Faltan campos requeridos en el cuerpo.'
                });
            }

            const vote = await this.voteUseCase.createVote(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('vote:created', vote);

            return res.status(200).json({
                success: true,
                message: 'Voto registrado.',
                data: vote
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (vote controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar el voto.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !usr_uuid || !vto_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el voto.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const vote = await this.voteUseCase.updateVote(cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('vote:updated', vote);

            return res.status(200).json({
                success: true,
                message: 'Voto actualizado.',
                data: vote
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (vote controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el voto.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !usr_uuid || !vto_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el voto.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const vote = await this.voteUseCase.deleteVote(cmp_uuid, cla_uuid, ten_uuid, usr_uuid, vto_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('vote:deleted', vote);

            return res.status(200).json({
                success: true,
                message: 'Voto eliminado.',
                data: vote
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (vote controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el voto.',
                error: error.message,
            });
        }
    }
}
