import { Request, Response } from "express";
import { FeeUseCase } from "../../../application/fee/fee-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class FeeController {
    constructor(private feeUseCase: FeeUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar las expensas.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }

            const usr_uuid = req.params.usr_uuid || (req.query.usr_uuid as string);
            const uni_uuid = req.params.uni_uuid || (req.query.uni_uuid as string);
            const usruni_uuid = req.params.usruni_uuid || (req.query.usruni_uuid as string);

            const filters: any = {};
            if (req.query.fee_status) filters.fee_status = req.query.fee_status as string;
            if (req.query.fee_period) filters.fee_period = req.query.fee_period as string;

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const fees = await this.feeUseCase.getFees(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, filters);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Expensas retornadas.',
                    ...paginator(fees, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Expensas retornadas.',
                    data: fees
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (fee controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las expensas.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la expensa.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const fee = await this.feeUseCase.getDetailFee(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid);
            return res.status(200).send({
                success: true,
                message: 'Expensa retornada.',
                data: fee
            });
        } catch (error: any) {
            console.error('Error en getCtrl (fee controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la expensa.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_period, fee_amount, fee_duedate, fee_status } = body;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_period || fee_amount === undefined || !fee_duedate || !fee_status) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la expensa.',
                    error: 'Faltan campos requeridos en el cuerpo.'
                });
            }

            const fee = await this.feeUseCase.createFee(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('fee:created', fee);

            return res.status(200).json({
                success: true,
                message: 'Expensa insertada.',
                data: fee
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (fee controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la expensa.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la expensa.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const fee = await this.feeUseCase.updateFee(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('fee:updated', fee);

            return res.status(200).json({
                success: true,
                message: 'Expensa actualizada.',
                data: fee
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (fee controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la expensa.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la expensa.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const fee = await this.feeUseCase.deleteFee(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('fee:deleted', fee);

            return res.status(200).json({
                success: true,
                message: 'Expensa eliminada.',
                data: fee
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (fee controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la expensa.',
                error: error.message,
            });
        }
    }
}
