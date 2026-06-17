import { Request, Response } from "express";
import { ClaimUseCase } from "../../../application/claim/claim-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ClaimController {
    constructor(private claimUseCase: ClaimUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid } = req.params;
            const cla_uuid = req.query.cla_uuid ? String(req.query.cla_uuid) : (req.params.cla_uuid ? String(req.params.cla_uuid) : '');

            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los reclamos.',
                    error: 'Debe proporcionar cmp_uuid.'
                });
            }

            const usr_uuid = req.query.usr_uuid ? String(req.query.usr_uuid) : '';
            const uni_uuid = req.query.uni_uuid ? String(req.query.uni_uuid) : '';
            const cla_status = req.query.cla_status ? String(req.query.cla_status) : '';
            const cla_type = req.query.cla_type ? String(req.query.cla_type) : '';
            const cla_priority = req.query.cla_priority ? String(req.query.cla_priority) : '';
            const filters = { usr_uuid, uni_uuid, cla_status, cla_type, cla_priority };

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const claims = await this.claimUseCase.getClaims(cmp_uuid, cla_uuid, filters);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Reclamos retornados.',
                    ...paginator(claims, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Reclamos retornados.',
                    data: claims
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (claim controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los reclamos.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el reclamo.',
                    error: 'Debe proporcionar cmp_uuid y cla_uuid.'
                });
            }
            const claim = await this.claimUseCase.getDetailClaim(cmp_uuid, cla_uuid);
            return res.status(200).send({
                success: true,
                message: 'Reclamo retornado.',
                data: claim
            });
        } catch (error: any) {
            console.error('Error en getCtrl (claim controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el reclamo.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, sit_uuid, spa_uuid, cla_title, cla_description, cla_type, cla_status, cla_priority } = body;
            if (!cmp_uuid || !usr_uuid || (!uni_uuid && (!sit_uuid || !spa_uuid)) || !cla_title || !cla_description || !cla_type || !cla_status) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el reclamo.',
                    error: 'Faltan campos requeridos en el cuerpo. Debe proporcionar una unidad privada (uni_uuid) o bien una sede (sit_uuid) y un espacio (spa_uuid).'
                });
            }

            const claim = await this.claimUseCase.createClaim(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim:created', claim);

            return res.status(200).json({
                success: true,
                message: 'Reclamo insertado.',
                data: claim
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (claim controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el reclamo.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el reclamo.',
                    error: 'Debe proporcionar cmp_uuid y cla_uuid.'
                });
            }
            const claim = await this.claimUseCase.updateClaim(cmp_uuid, cla_uuid, {
                usr_uuid: update.usr_uuid,
                uni_uuid: update.uni_uuid,
                sit_uuid: update.sit_uuid,
                spa_uuid: update.spa_uuid,
                cla_title: update.cla_title,
                cla_description: update.cla_description,
                cla_type: update.cla_type,
                cla_status: update.cla_status,
                cla_priority: update.cla_priority
            });

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim:updated', claim);

            return res.status(200).json({
                success: true,
                message: 'Reclamo actualizado.',
                data: claim
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (claim controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el reclamo.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el reclamo.',
                    error: 'Debe proporcionar cmp_uuid y cla_uuid.'
                });
            }
            const claim = await this.claimUseCase.deleteClaim(cmp_uuid, cla_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim:deleted', claim);

            return res.status(200).json({
                success: true,
                message: 'Reclamo eliminado.',
                data: claim
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (claim controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el reclamo.',
                error: error.message,
            });
        }
    }
}
