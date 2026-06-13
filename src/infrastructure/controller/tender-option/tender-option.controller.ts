import { Request, Response } from "express";
import { TenderOptionUseCase } from "../../../application/tender-option/tender-option-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class TenderOptionController {
    constructor(private tenderOptionUseCase: TenderOptionUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar las opciones de licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y ten_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const options = await this.tenderOptionUseCase.getTenderOptions(cmp_uuid, cla_uuid, ten_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Opciones de licitación retornadas.',
                    ...paginator(options, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Opciones de licitación retornadas.',
                    data: options
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (tender option controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las opciones de licitación.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !tenopt_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la opción de licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid, ten_uuid y tenopt_uuid.'
                });
            }
            const option = await this.tenderOptionUseCase.getDetailTenderOption(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid);
            return res.status(200).send({
                success: true,
                message: 'Opción de licitación retornada.',
                data: option
            });
        } catch (error: any) {
            console.error('Error en getCtrl (tender option controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la opción de licitación.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, tenopt_providername, tenopt_amount } = body;
            if (!cmp_uuid || !cla_uuid || !ten_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la opción de licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y ten_uuid.'
                });
            }
            if (!tenopt_providername) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la opción de licitación.',
                    error: 'Debe proporcionar tenopt_providername.'
                });
            }
            if (tenopt_amount === undefined || tenopt_amount === null) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la opción de licitación.',
                    error: 'Debe proporcionar tenopt_amount.'
                });
            }

            const option = await this.tenderOptionUseCase.createTenderOption(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('tender-option:created', option);

            return res.status(200).json({
                success: true,
                message: 'Opción de licitación insertada.',
                data: option
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (tender option controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la opción de licitación.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !tenopt_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la opción de licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid, ten_uuid y tenopt_uuid.'
                });
            }
            const option = await this.tenderOptionUseCase.updateTenderOption(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('tender-option:updated', option);

            return res.status(200).json({
                success: true,
                message: 'Opción de licitación actualizada.',
                data: option
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (tender option controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la opción de licitación.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !ten_uuid || !tenopt_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la opción de licitación.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid, ten_uuid y tenopt_uuid.'
                });
            }
            const option = await this.tenderOptionUseCase.deleteTenderOption(cmp_uuid, cla_uuid, ten_uuid, tenopt_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('tender-option:deleted', option);

            return res.status(200).json({
                success: true,
                message: 'Opción de licitación eliminada.',
                data: option
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (tender option controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la opción de licitación.',
                error: error.message,
            });
        }
    }
}
