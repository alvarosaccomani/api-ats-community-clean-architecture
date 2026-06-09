import { Request, Response } from "express";
import { ResourceModuleUseCase } from "../../../application/resource-module/resource-module-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ResourceModuleController {
    constructor(private resourceModuleUseCase: ResourceModuleUseCase, private socketAdapter: SocketAdapter) {
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
                const items = await this.resourceModuleUseCase.getResourceModules()
                return res.status(200).send({
                    success: true,
                    message: 'Módulos de recursos retornados.',
                    ...paginator(items, page, perPage)
                });
            } else {
                const items = await this.resourceModuleUseCase.getResourceModules()
                return res.status(200).send({
                    success: true,
                    message: 'Módulos de recursos retornados.',
                    data: items
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los módulos de recursos.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const remo_uuid = req.params.remo_uuid;
            if(!remo_uuid || remo_uuid.toLowerCase() === 'null' || remo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el módulo de recurso.',
                    error: 'Debe proporcionar un Id de módulo de recurso.'
                });
            }
            const resourceModule = await this.resourceModuleUseCase.getDetailResourceModule(`${remo_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Módulo de recurso retornado.',
                data: resourceModule
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el módulo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const remo_name = body.remo_name;
            if(!remo_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el módulo de recurso.',
                    error: 'Debe proporcionar un Nombre para el módulo de recurso.'
                })
            };
            const resourceModuleByName = await this.resourceModuleUseCase.findResourceModuleByName(remo_name);
            if(resourceModuleByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el módulo de recurso.',
                    error: `El nombre ${remo_name} de módulo de recurso ya existe.`
                });
            }
            const resourceModule = await this.resourceModuleUseCase.createResourceModule(body)
            return res.status(200).json({
                success: true,
                message: 'Módulo de recurso insertado.',
                data: resourceModule
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el módulo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const remo_uuid = req.params.remo_uuid;
            const update = req.body;
            if(!update.remo_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el módulo de recurso.',
                    error: 'Debe proporcionar un Nombre para el módulo de recurso.'
                })
            };
            const resourceModuleByName = await this.resourceModuleUseCase.findResourceModuleByName(update.remo_name, update.remo_uuid);
            if(resourceModuleByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el módulo de recurso.',
                    error: `El nombre ${update.remo_name} de módulo de recurso ya existe.`
                });
            }
            const resourceModule = await this.resourceModuleUseCase.updateResourceModule(remo_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Módulo de recurso actualizado.',
                data: resourceModule
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el módulo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const remo_uuid = req.params.remo_uuid;
            if(!remo_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el módulo de recurso.',
                    error: 'Debe proporcionar un Id de módulo de recurso.'
                });
            };
            const resourceModule = await this.resourceModuleUseCase.deleteResourceModule(remo_uuid)
            return res.status(200).json({
                success: true,
                message: 'Módulo de recurso eliminado.',
                data: resourceModule
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el módulo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}