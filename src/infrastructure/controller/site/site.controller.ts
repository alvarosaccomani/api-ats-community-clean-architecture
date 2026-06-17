import { Request, Response } from "express";
import { SiteUseCase } from "../../../application/site/site-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class SiteController {
    constructor(private siteUseCase: SiteUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar las sedes.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }
            const sites = await this.siteUseCase.getSites(cmp_uuid);
            return res.status(200).send({
                success: true,
                message: 'Sedes retornadas.',
                data: sites
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (site controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las sedes.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la sede.',
                    error: 'Debe proporcionar cmp_uuid y sit_uuid.'
                });
            }
            const site = await this.siteUseCase.getDetailSite(cmp_uuid, sit_uuid);
            return res.status(200).send({
                success: true,
                message: 'Sede retornada.',
                data: site
            });
        } catch (error: any) {
            console.error('Error en getCtrl (site controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la sede.',
                error: error.message,
            });
        }
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_name, sit_address, sit_status } = req.body;
            if (!cmp_uuid || !sit_name || !sit_address) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la sede.',
                    error: 'Faltan campos requeridos en el cuerpo (cmp_uuid, sit_name, sit_address).'
                });
            }
            const site = await this.siteUseCase.createSite({ cmp_uuid, sit_name, sit_address, sit_status });
            this.socketAdapter.emitEvent('site:created', site);
            return res.status(200).json({
                success: true,
                message: 'Sede insertada.',
                data: site
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (site controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la sede.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid } = req.params;
            const { sit_name, sit_address, sit_status } = req.body;
            if (!cmp_uuid || !sit_uuid || !sit_name || !sit_address || !sit_status) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la sede.',
                    error: 'Faltan campos requeridos.'
                });
            }
            const site = await this.siteUseCase.updateSite(cmp_uuid, sit_uuid, { sit_name, sit_address, sit_status });
            this.socketAdapter.emitEvent('site:updated', site);
            return res.status(200).json({
                success: true,
                message: 'Sede actualizada.',
                data: site
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (site controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la sede.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, sit_uuid } = req.params;
            if (!cmp_uuid || !sit_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la sede.',
                    error: 'Debe proporcionar cmp_uuid y sit_uuid.'
                });
            }
            const site = await this.siteUseCase.deleteSite(cmp_uuid, sit_uuid);
            this.socketAdapter.emitEvent('site:deleted', site);
            return res.status(200).json({
                success: true,
                message: 'Sede eliminada.',
                data: site
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (site controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la sede.',
                error: error.message,
            });
        }
    }
}
