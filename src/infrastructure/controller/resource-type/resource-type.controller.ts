import { Request, Response } from "express";
import { ResourceTypeUseCase } from "../../../application/resource-type/resource-type-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ResourceTypeController {
    constructor(private resourceTypeUseCase: ResourceTypeUseCase, private socketAdapter: SocketAdapter) {
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
                const items = await this.resourceTypeUseCase.getResourceTypes()
                return res.status(200).send({
                    success: true,
                    message: 'Tipos de recursos retornados.',
                    ...paginator(items, page, perPage)
                });
            } else {
                const items = await this.resourceTypeUseCase.getResourceTypes()
                return res.status(200).send({
                    success: true,
                    message: 'Tipos de recursos retornados.',
                    data: items
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los tipos de recursos.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const rety_uuid = req.params.rety_uuid;
            if(!rety_uuid || rety_uuid.toLowerCase() === 'null' || rety_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el tipo de recurso.',
                    error: 'Debe proporcionar un Id de tipo de recurso.'
                });
            }
            const resourceType = await this.resourceTypeUseCase.getDetailResourceType(`${rety_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Tipo de recurso retornado.',
                data: resourceType
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el tipo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const rety_name = body.rety_name;
            if(!rety_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el tipo de recurso.',
                    error: 'Debe proporcionar un Nombre para el tipo de recurso.'
                })
            };
            const resourceTypeByName = await this.resourceTypeUseCase.findResourceTypeByName(rety_name);
            if(resourceTypeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el tipo de recurso.',
                    error: `El nombre ${rety_name} de tipo de recurso ya existe.`
                });
            }
            const resourceType = await this.resourceTypeUseCase.createResourceType(body)
            return res.status(200).json({
                success: true,
                message: 'Tipo de recurso insertado.',
                data: resourceType
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el tipo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const rety_uuid = req.params.rety_uuid;
            const update = req.body;
            if(!update.rety_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el tipo de recurso.',
                    error: 'Debe proporcionar un Nombre para el tipo de recurso.'
                })
            };
            const resourceTypeByName = await this.resourceTypeUseCase.findResourceTypeByName(update.rety_name, update.rety_uuid);
            if(resourceTypeByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el tipo de recurso.',
                    error: `El nombre ${update.rety_name} de tipo de recurso ya existe.`
                });
            }
            const resourceType = await this.resourceTypeUseCase.updateResourceType(rety_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Tipo de recurso actualizado.',
                data: resourceType
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el tipo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const rety_uuid = req.params.rety_uuid;
            if(!rety_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el tipo de recurso.',
                    error: 'Debe proporcionar un Id de tipo de recurso.'
                });
            };
            const resourceType = await this.resourceTypeUseCase.deleteResourceType(rety_uuid)
            return res.status(200).json({
                success: true,
                message: 'Tipo de recurso eliminado.',
                data: resourceType
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el tipo de recurso.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}