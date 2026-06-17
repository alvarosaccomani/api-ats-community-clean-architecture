import { Request, Response } from "express";
import { ReservationUseCase } from "../../../application/reservation/reservation-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class ReservationController {
    constructor(private reservationUseCase: ReservationUseCase, private socketAdapter: SocketAdapter) {
        this.getBySpaceCtrl = this.getBySpaceCtrl.bind(this);
        this.getByUserCtrl = this.getByUserCtrl.bind(this);
        this.getByCompanyCtrl = this.getByCompanyCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getBySpaceCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid || !spa_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las reservas.',
                    error: 'Debe proporcionar cmp_uuid, sit_uuid y spa_uuid.'
                });
            }
            const reservations = await this.reservationUseCase.getReservationsBySpace(cmp_uuid, sit_uuid, spa_uuid);
            return res.status(200).send({
                success: true,
                message: 'Reservas del espacio retornadas.',
                data: reservations
            });
        } catch (error: any) {
            console.error('Error en getBySpaceCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las reservas.',
                error: error.message,
            });
        }
    }

    public async getByUserCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las reservas.',
                    error: 'Debe proporcionar cmp_uuid y usr_uuid.'
                });
            }
            const reservations = await this.reservationUseCase.getReservationsByUser(cmp_uuid, usr_uuid);
            return res.status(200).send({
                success: true,
                message: 'Reservas del usuario retornadas.',
                data: reservations
            });
        } catch (error: any) {
            console.error('Error en getByUserCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las reservas.',
                error: error.message,
            });
        }
    }

    public async getByCompanyCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid } = req.params;
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las reservas.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }
            const reservations = await this.reservationUseCase.getReservationsByCompany(cmp_uuid);
            return res.status(200).send({
                success: true,
                message: 'Reservas de la compañía retornadas.',
                data: reservations
            });
        } catch (error: any) {
            console.error('Error en getByCompanyCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las reservas.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid || !spa_uuid || !usr_uuid || !res_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la reserva.',
                    error: 'Debe proporcionar cmp_uuid, sit_uuid, spa_uuid, usr_uuid y res_uuid.'
                });
            }
            const reservation = await this.reservationUseCase.getDetailReservation(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid);
            return res.status(200).send({
                success: true,
                message: 'Reserva retornada.',
                data: reservation
            });
        } catch (error: any) {
            console.error('Error en getCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la reserva.',
                error: error.message,
            });
        }
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_date, res_slot, res_status } = req.body;
            if (!cmp_uuid || !sit_uuid || !spa_uuid || !usr_uuid || !res_date || !res_slot) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo crear la reserva.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_date, res_slot).'
                });
            }
            const reservation = await this.reservationUseCase.createReservation({ cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_date, res_slot, res_status });
            this.socketAdapter.emitEvent('reservation:created', reservation);
            return res.status(200).json({
                success: true,
                message: 'Reserva creada con éxito.',
                data: reservation
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo crear la reserva.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid } = req.params;
            const { res_status } = req.body;
            if (!cmp_uuid || !sit_uuid || !spa_uuid || !usr_uuid || !res_uuid || !res_status) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la reserva.',
                    error: 'Faltan campos requeridos (cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid y res_status).'
                });
            }
            const reservation = await this.reservationUseCase.updateReservation(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid, { res_status });
            this.socketAdapter.emitEvent('reservation:updated', reservation);
            return res.status(200).json({
                success: true,
                message: 'Reserva actualizada.',
                data: reservation
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la reserva.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid || !spa_uuid || !usr_uuid || !res_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la reserva.',
                    error: 'Debe proporcionar cmp_uuid, sit_uuid, spa_uuid, usr_uuid y res_uuid.'
                });
            }
            const reservation = await this.reservationUseCase.deleteReservation(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid);
            this.socketAdapter.emitEvent('reservation:deleted', reservation);
            return res.status(200).json({
                success: true,
                message: 'Reserva eliminada.',
                data: reservation
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (reservation controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la reserva.',
                error: error.message,
            });
        }
    }
}
