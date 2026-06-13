import { Request, Response } from "express";
import { TransactionUseCase } from "../../../application/transaction/transaction-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class TransactionController {
    constructor(private transactionUseCase: TransactionUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar las transacciones.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }

            const usr_uuid = req.params.usr_uuid || (req.query.usr_uuid as string);
            const uni_uuid = req.params.uni_uuid || (req.query.uni_uuid as string);
            const usruni_uuid = req.params.usruni_uuid || (req.query.usruni_uuid as string);
            const fee_uuid = req.params.fee_uuid || (req.query.fee_uuid as string);

            const filters: any = {};
            if (req.query.tra_status) filters.tra_status = req.query.tra_status as string;

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const transactions = await this.transactionUseCase.getTransactions(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, filters);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Transacciones retornadas.',
                    ...paginator(transactions, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Transacciones retornadas.',
                    data: transactions
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (transaction controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las transacciones.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid || !tra_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la transacción.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const transaction = await this.transactionUseCase.getDetailTransaction(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid);
            return res.status(200).send({
                success: true,
                message: 'Transacción retornada.',
                data: transaction
            });
        } catch (error: any) {
            console.error('Error en getCtrl (transaction controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la transacción.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_gatewayid, tra_totalamount, tra_recipientamount, tra_status } = body;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid || !tra_gatewayid || tra_totalamount === undefined || tra_recipientamount === undefined || !tra_status) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo registrar la transacción.',
                    error: 'Faltan campos requeridos en el cuerpo.'
                });
            }

            const transaction = await this.transactionUseCase.createTransaction(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('transaction:created', transaction);

            return res.status(200).json({
                success: true,
                message: 'Transacción registrada.',
                data: transaction
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (transaction controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar la transacción.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid || !tra_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la transacción.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const transaction = await this.transactionUseCase.updateTransaction(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('transaction:updated', transaction);

            return res.status(200).json({
                success: true,
                message: 'Transacción actualizada.',
                data: transaction
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (transaction controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la transacción.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_uuid || !fee_uuid || !tra_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la transacción.',
                    error: 'Faltan parámetros identificadores en la ruta.'
                });
            }
            const transaction = await this.transactionUseCase.deleteTransaction(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('transaction:deleted', transaction);

            return res.status(200).json({
                success: true,
                message: 'Transacción eliminada.',
                data: transaction
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (transaction controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la transacción.',
                error: error.message,
            });
        }
    }
}
