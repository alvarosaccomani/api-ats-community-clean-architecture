import { Request, Response } from "express";
import { RolPermissionUseCase } from "../../../application/rol-permission/rol-permission-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class RolPermissionController {
    constructor(private rolPermissionUseCase: RolPermissionUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getRolPermissionsByRolCtrl = this.getRolPermissionsByRolCtrl.bind(this);
        this.getRolPermissionsByPermissionCtrl = this.getRolPermissionsByPermissionCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const rolPermissions = await this.rolPermissionUseCase.getRolPermissions()
                return res.status(200).send({
                    success: true,
                    message: 'Permisos de rol retornados.',
                    ...paginator(rolPermissions, page, perPage)
                });
            } else {
                const rolPermissions = await this.rolPermissionUseCase.getRolPermissions()
                return res.status(200).send({
                    success: true,
                    message: 'Permisos de rol retornados.',
                    data: rolPermissions
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los permisos de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            const per_uuid = req.params.per_uuid;
            if(!per_uuid || per_uuid.toLowerCase() === 'null' || per_uuid.toLowerCase() === 'undefined' || !rol_uuid || rol_uuid.toLowerCase() === 'null' || rol_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el permiso de rol.',
                    error: 'Debe proporcionar un Id de permiso de rol.'
                });
            }
            const rolPermission = await this.rolPermissionUseCase.getDetailRolPermission(`${rol_uuid}`, `${per_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Permiso de rol retornada.',
                data: rolPermission
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el permiso de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const rol_uuid = body.rol_uuid;
            const per_uuid = body.per_uuid;
            const rolPermissionExist = await this.rolPermissionUseCase.existRolPermission(rol_uuid, per_uuid);
            if(rolPermissionExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el permiso de rol.',
                    error: `El permiso de rol ya existe.`
                });
            }
            const rolPermission = await this.rolPermissionUseCase.createRolPermission(body)
            return res.status(200).json({
                success: true,
                message: 'Permiso de rol insertado.',
                data: rolPermission
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el permiso de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const update = req.body;
            const rolPermissionExist = await this.rolPermissionUseCase.existRolPermission(update.rol_uuid, update.per_uuid);
            if(rolPermissionExist) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el permiso de rol.',
                    error: `El permiso de rol ya existe.`
                });
            }
            const rolPermission = await this.rolPermissionUseCase.updateRolPermission(update.rol_uuid, update.per_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Permiso de rol actualizado.',
                data: rolPermission
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el permiso de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            const per_uuid = req.params.per_uuid;
            if(!rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el permiso de rol.',
                    error: 'Debe proporcionar un Id de permiso.'
                });
            };
            if(!per_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el permiso de rol.',
                    error: 'Debe proporcionar un Id de rol.'
                });
            };
            const rolPermission = await this.rolPermissionUseCase.deleteRolPermission(rol_uuid, per_uuid)
            return res.status(200).json({
                success: true,
                message: 'Permiso de rol eliminado.',
                data: rolPermission
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el permiso de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getRolPermissionsByRolCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            const rolPermissions = await this.rolPermissionUseCase.getRolPermissionsByRol(rol_uuid);
            return res.status(200).send({
                success: true,
                message: 'Permisos de rol retornados.',
                data: rolPermissions
            });
        } catch (error: any) {
            console.error('Error en getRolPermissionsByRolCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los permisos de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getRolPermissionsByPermissionCtrl(req: Request, res: Response) {
        try {
            const per_uuid = req.params.per_uuid;
            const rolPermissions = await this.rolPermissionUseCase.getRolPermissionsByPermission(per_uuid);
            return res.status(200).send({
                success: true,
                message: 'Permisos de rol retornados.',
                data: rolPermissions
            });
        } catch (error: any) {
            console.error('Error en getRolPermissionsByPermissionCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los permisos de rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}