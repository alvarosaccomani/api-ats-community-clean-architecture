import { Request, Response } from "express";
import { SpaceUseCase } from "../../../application/space/space-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class SpaceController {
    constructor(private spaceUseCase: SpaceUseCase, private socketAdapter: SocketAdapter) {
        this.getBySiteCtrl = this.getBySiteCtrl.bind(this);
        this.getByCompanyCtrl = this.getByCompanyCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getBySiteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los espacios.',
                    error: 'Debe proporcionar cmp_uuid y sit_uuid.'
                });
            }
            const spaces = await this.spaceUseCase.getSpacesBySite(cmp_uuid, sit_uuid);
            return res.status(200).send({
                success: true,
                message: 'Espacios retornados por sede.',
                data: spaces
            });
        } catch (error: any) {
            console.error('Error en getBySiteCtrl (space controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los espacios.',
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
                    message: 'No se pudo recuperar los espacios.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }
            const spaces = await this.spaceUseCase.getSpaces(cmp_uuid);
            return res.status(200).send({
                success: true,
                message: 'Espacios retornados por compañía.',
                data: spaces
            });
        } catch (error: any) {
            console.error('Error en getByCompanyCtrl (space controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los espacios.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid || !spa_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el espacio.',
                    error: 'Debe proporcionar cmp_uuid, sit_uuid y spa_uuid.'
                });
            }
            const space = await this.spaceUseCase.getDetailSpace(cmp_uuid, sit_uuid, spa_uuid);
            return res.status(200).send({
                success: true,
                message: 'Espacio retornado.',
                data: space
            });
        } catch (error: any) {
            console.error('Error en getCtrl (space controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el espacio.',
                error: error.message,
            });
        }
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status } = req.body;
            if (!cmp_uuid || !sit_uuid || !spa_code || !spa_name || !spa_type) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el espacio.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, sit_uuid, spa_code, spa_name, spa_type).'
                });
            }
            const space = await this.spaceUseCase.createSpace({ cmp_uuid, sit_uuid, spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status });
            this.socketAdapter.emitEvent('space:created', space);
            return res.status(200).json({
                success: true,
                message: 'Espacio insertado.',
                data: space
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (space controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el espacio.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid } = req.params;
            const { spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status } = req.body;
            if (!cmp_uuid || !sit_uuid || !spa_uuid || !spa_code || !spa_name || !spa_type || !spa_status) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el espacio.',
                    error: 'Faltan campos requeridos (cmp_uuid, sit_uuid, spa_uuid, spa_code, spa_name, spa_type, spa_status).'
                });
            }
            const space = await this.spaceUseCase.updateSpace(cmp_uuid, sit_uuid, spa_uuid, { spa_code, spa_name, spa_type, spa_capacity, spa_cost, spa_status });
            this.socketAdapter.emitEvent('space:updated', space);
            return res.status(200).json({
                success: true,
                message: 'Espacio actualizado.',
                data: space
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (space controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el espacio.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid || !spa_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el espacio.',
                    error: 'Debe proporcionar cmp_uuid, sit_uuid y spa_uuid.'
                });
            }
            const space = await this.spaceUseCase.deleteSpace(cmp_uuid, sit_uuid, spa_uuid);
            this.socketAdapter.emitEvent('space:deleted', space);
            return res.status(200).json({
                success: true,
                message: 'Espacio eliminado.',
                data: space
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (space controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el espacio.',
                error: error.message,
            });
        }
    }
}
