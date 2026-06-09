import { Request, Response } from "express";
import { PermissionUseCase } from "../../../application/permission/permission-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class PermissionController {
    constructor(private permissionUseCase: PermissionUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const permission = await this.permissionUseCase.getPermissions()
                return res.status(200).send({
                    success: true,
                    message: 'Permisos retornados.',
                    ...paginator(permission, page, perPage)
                });
            } else {
                const permission = await this.permissionUseCase.getPermissions()
                return res.status(200).send({
                    success: true,
                    message: 'Permisos retornados.',
                    data: permission
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los permisos.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const per_uuid = req.params.per_uuid;
            if(!per_uuid || per_uuid.toLowerCase() === 'null' || per_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el permiso.',
                    error: 'Debe proporcionar un Id de permiso.'
                });
            }
            const permission = await this.permissionUseCase.getDetailPermission(`${per_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Permiso retornado.',
                data: permission
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el permiso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const per_slug = body.per_slug;
            if(!per_slug) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el permiso.',
                    error: 'Debe proporcionar un Nombre para el permiso.'
                })
            };
            const permissionByName = await this.permissionUseCase.findPermissionBySlug(per_slug);
            if(permissionByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el permiso.',
                    error: `El nombre ${per_slug} de permiso ya existe.`
                });
            }
            const permission = await this.permissionUseCase.createPermission(body)
            return res.status(200).json({
                success: true,
                message: 'Permiso insertado.',
                data: permission
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el permiso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const per_uuid = req.params.per_uuid;
            const update = req.body;
            const permission = await this.permissionUseCase.updatePermission(per_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Permiso actualizado.',
                data: permission
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el permiso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const per_uuid = req.params.per_uuid;
            if(!per_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el permiso.',
                    error: 'Debe proporcionar un Id de permiso.'
                });
            };
            const permission = await this.permissionUseCase.deletePermission(per_uuid)
            return res.status(200).json({
                success: true,
                message: 'Permiso eliminado.',
                data: permission
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el permiso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}