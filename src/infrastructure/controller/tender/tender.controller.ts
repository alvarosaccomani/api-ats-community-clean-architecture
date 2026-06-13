import { Request, Response } from "express";
import { TenderUseCase } from "../../../application/tender/tender-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class TenderController {
    constructor(private tenderUseCase: TenderUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las licitaciones.',
                    error: 'Debe proporcionar cmp_uuid y cla_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const tenders = await this.tenderUseCase.getTenders(cmp_uuid, cla_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Licitaciones retornadas.',
                    ...paginator(tenders, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Licitaciones retornadas.',
                    data: tenders
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (tender controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las licitaciones.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y ten_uuid.'
                });
            }
            const tender = await this.tenderUseCase.getDetailTender(cmp_uuid, cla_uuid, ten_uuid);
            return res.status(200).send({
                success: true,
                message: 'Licitación retornada.',
                data: tender
            });
        } catch (error: any) {
            console.error('Error en getCtrl (tender controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la licitación.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_votingdeadline } = body;
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la licitación.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }
            if (!cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la licitación.',
                    error: 'Debe proporcionar cla_uuid.'
                });
            }
            if (!ten_votingdeadline) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la licitación.',
                    error: 'Debe proporcionar ten_votingdeadline.'
                });
            }

            const tender = await this.tenderUseCase.createTender(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('tender:created', tender);

            return res.status(200).json({
                success: true,
                message: 'Licitación insertada.',
                data: tender
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (tender controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la licitación.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !cla_uuid || !ten_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y ten_uuid.'
                });
            }
            const tender = await this.tenderUseCase.updateTender(cmp_uuid, cla_uuid, ten_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('tender:updated', tender);

            return res.status(200).json({
                success: true,
                message: 'Licitación actualizada.',
                data: tender
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (tender controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la licitación.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y ten_uuid.'
                });
            }
            const tender = await this.tenderUseCase.deleteTender(cmp_uuid, cla_uuid, ten_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('tender:deleted', tender);

            return res.status(200).json({
                success: true,
                message: 'Licitación eliminada.',
                data: tender
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (tender controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la licitación.',
                error: error.message,
            });
        }
    }
}
