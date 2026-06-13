import { Request, Response } from "express";
import { UserUnitUseCase } from "../../../application/user-unit/user-unit-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class UserUnitController {
    constructor(private userUnitUseCase: UserUnitUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getUnitUsersCtrl = this.getUnitUsersCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las asignaciones de unidades.',
                    error: 'Debe proporcionar cmp_uuid y usr_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const userUnits = await this.userUnitUseCase.getUsersUnits(cmp_uuid, usr_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Asignaciones de unidades retornadas.',
                    ...paginator(userUnits, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Asignaciones de unidades retornadas.',
                    data: userUnits
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (user unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las asignaciones de unidades.',
                error: error.message,
            });
        }
    }

    public async getUnitUsersCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, uni_uuid } = req.params;
            if (!cmp_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los habitantes de la unidad.',
                    error: 'Debe proporcionar cmp_uuid y uni_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const userUnits = await this.userUnitUseCase.getUnitUsers(cmp_uuid, uni_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Habitantes de la unidad retornados.',
                    ...paginator(userUnits, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Habitantes de la unidad retornados.',
                    data: userUnits
                });
            }
        } catch (error: any) {
            console.error('Error en getUnitUsersCtrl:', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los habitantes de la unidad.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la asignación de unidad.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y uni_uuid.'
                });
            }
            const userUnit = await this.userUnitUseCase.getDetailUserUnit(cmp_uuid, usr_uuid, uni_uuid);
            return res.status(200).send({
                success: true,
                message: 'Asignación de unidad retornada.',
                data: userUnit
            });
        } catch (error: any) {
            console.error('Error en getCtrl (user unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la asignación de unidad.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_relationtype, usruni_startdate } = body;
            if (!cmp_uuid || !usr_uuid || !uni_uuid || !usruni_relationtype || !usruni_startdate) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo registrar la asignación de unidad.',
                    error: 'Faltan campos requeridos en el cuerpo.'
                });
            }

            const userUnit = await this.userUnitUseCase.createUserUnit(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('user-unit:created', userUnit);

            return res.status(200).json({
                success: true,
                message: 'Asignación de unidad registrada.',
                data: userUnit
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (user unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar la asignación de unidad.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !usr_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la asignación de unidad.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y uni_uuid.'
                });
            }
            const userUnit = await this.userUnitUseCase.updateUserUnit(cmp_uuid, usr_uuid, uni_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('user-unit:updated', userUnit);

            return res.status(200).json({
                success: true,
                message: 'Asignación de unidad actualizada.',
                data: userUnit
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (user unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la asignación de unidad.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid } = req.params;
            if (!cmp_uuid || !usr_uuid || !uni_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la asignación de unidad.',
                    error: 'Debe proporcionar cmp_uuid, usr_uuid y uni_uuid.'
                });
            }
            const userUnit = await this.userUnitUseCase.deleteUserUnit(cmp_uuid, usr_uuid, uni_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('user-unit:deleted', userUnit);

            return res.status(200).json({
                success: true,
                message: 'Asignación de unidad eliminada.',
                data: userUnit
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (user unit controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la asignación de unidad.',
                error: error.message,
            });
        }
    }
}
