import { Request, Response } from "express";
import { UnitUseCase } from "../../../application/unit/unit-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class UnitController {
    constructor(private unitUseCase: UnitUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar las unidades.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const units = await this.unitUseCase.getUnits(cmp_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Unidades retornadas.',
                    ...paginator(units, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Unidades retornadas.',
                    data: units
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las unidades.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, uni_uuid } = req.params;
            if (!cmp_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la unidad.',
                    error: 'Debe proporcionar cmp_uuid y uni_uuid.'
                });
            }
            const unit = await this.unitUseCase.getDetailUnit(cmp_uuid, uni_uuid);
            return res.status(200).send({
                success: true,
                message: 'Unidad retornada.',
                data: unit
            });
        } catch (error: any) {
            console.error('Error en getCtrl (unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la unidad.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, uni_code, uni_category, uni_status, uni_financialcoefficient, uni_baseamountcustom } = body;
            if (!cmp_uuid || !uni_code || !uni_category || !uni_status || uni_financialcoefficient === undefined || uni_baseamountcustom === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la unidad.',
                    error: 'Faltan campos requeridos en el cuerpo.'
                });
            }

            const unit = await this.unitUseCase.createUnit(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('unit:created', unit);

            return res.status(200).json({
                success: true,
                message: 'Unidad insertada.',
                data: unit
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la unidad.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, uni_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la unidad.',
                    error: 'Debe proporcionar cmp_uuid y uni_uuid.'
                });
            }
            const unit = await this.unitUseCase.updateUnit(cmp_uuid, uni_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('unit:updated', unit);

            return res.status(200).json({
                success: true,
                message: 'Unidad actualizada.',
                data: unit
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la unidad.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, uni_uuid } = req.params;
            if (!cmp_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la unidad.',
                    error: 'Debe proporcionar cmp_uuid y uni_uuid.'
                });
            }
            const unit = await this.unitUseCase.deleteUnit(cmp_uuid, uni_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('unit:deleted', unit);

            return res.status(200).json({
                success: true,
                message: 'Unidad eliminada.',
                data: unit
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la unidad.',
                error: error.message,
            });
        }
    }
}
