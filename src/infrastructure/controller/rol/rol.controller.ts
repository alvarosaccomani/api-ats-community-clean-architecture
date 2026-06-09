import { Request, Response } from "express";
import { RolUseCase } from "../../../application/rol/rol-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class RolController {
    constructor(private rolUseCase: RolUseCase, private socketAdapter: SocketAdapter) {
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
                const roles = await this.rolUseCase.getRoles()
                return res.status(200).send({
                    success: true,
                    message: 'Roles retornados.',
                    ...paginator(roles, page, perPage)
                });
            } else {
                const roles = await this.rolUseCase.getRoles()
                return res.status(200).send({
                    success: true,
                    message: 'Roles retornados.',
                    data: roles
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los roles.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            if(!rol_uuid || rol_uuid.toLowerCase() === 'null' || rol_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el rol.',
                    error: 'Debe proporcionar un Id de rol.'
                });
            }
            const rol = await this.rolUseCase.getDetailRol(`${rol_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Rol retornado.',
                data: rol
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const rol_name = body.rol_name;
            if(!rol_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el rol.',
                    error: 'Debe proporcionar un Nombre para el rol.'
                })
            };
            const rolByName = await this.rolUseCase.findRolByName(rol_name);
            if(rolByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el rol.',
                    error: `El nombre ${rol_name} de rol ya existe.`
                });
            }
            const rol = await this.rolUseCase.createRol(body)
            return res.status(200).json({
                success: true,
                message: 'Rol insertado.',
                data: rol
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            const update = req.body;
            if(!update.rol_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el rol.',
                    error: 'Debe proporcionar un Nombre para el rol.'
                })
            };
            const rolByName = await this.rolUseCase.findRolByName(update.rol_name, update.rol_uuid);
            if(rolByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el rol.',
                    error: `El nombre ${update.rol_name} de rol ya existe.`
                });
            }
            const rol = await this.rolUseCase.updateRol(rol_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Rol actualizado.',
                data: rol
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const rol_uuid = req.params.rol_uuid;
            if(!rol_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el rol.',
                    error: 'Debe proporcionar un Id de rol.'
                });
            };
            const rol = await this.rolUseCase.deleteRol(rol_uuid)
            return res.status(200).json({
                success: true,
                message: 'Rol eliminada.',
                data: rol
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el rol.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}