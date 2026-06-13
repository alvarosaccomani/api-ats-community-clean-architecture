import { Request, Response } from "express";
import { ClaimImageUseCase } from "../../../application/claim-image/claim-image-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ClaimImageController {
    constructor(private claimImageUseCase: ClaimImageUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las imágenes del reclamo.',
                    error: 'Debe proporcionar cmp_uuid y cla_uuid.'
                });
            }

            const page = req.query.page ? parseInt(req.query.page as string) : (req.params.page ? parseInt(req.params.page) : null);
            const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : (req.params.perPage ? parseInt(req.params.perPage) : null);

            const images = await this.claimImageUseCase.getClaimImages(cmp_uuid, cla_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Imágenes del reclamo retornadas.',
                    ...paginator(images, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Imágenes del reclamo retornadas.',
                    data: images
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (claim image controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las imágenes del reclamo.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, claimg_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !claimg_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la imagen del reclamo.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y claimg_uuid.'
                });
            }
            const image = await this.claimImageUseCase.getDetailClaimImage(cmp_uuid, cla_uuid, claimg_uuid);
            return res.status(200).send({
                success: true,
                message: 'Imagen del reclamo retornada.',
                data: image
            });
        } catch (error: any) {
            console.error('Error en getCtrl (claim image controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la imagen del reclamo.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, claimg_image, claimg_moment } = body;
            if (!cmp_uuid || !cla_uuid || !claimg_image || !claimg_moment) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la imagen del reclamo.',
                    error: 'Faltan campos requeridos en el cuerpo.'
                });
            }

            const image = await this.claimImageUseCase.createClaimImage(body);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim-image:created', image);

            return res.status(200).json({
                success: true,
                message: 'Imagen del reclamo insertada.',
                data: image
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (claim image controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la imagen del reclamo.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, claimg_uuid } = req.params;
            const update = req.body;
            if (!cmp_uuid || !cla_uuid || !claimg_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la imagen del reclamo.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y claimg_uuid.'
                });
            }
            const image = await this.claimImageUseCase.updateClaimImage(cmp_uuid, cla_uuid, claimg_uuid, update);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim-image:updated', image);

            return res.status(200).json({
                success: true,
                message: 'Imagen del reclamo actualizada.',
                data: image
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (claim image controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la imagen del reclamo.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cla_uuid, claimg_uuid } = req.params;
            if (!cmp_uuid || !cla_uuid || !claimg_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la imagen del reclamo.',
                    error: 'Debe proporcionar cmp_uuid, cla_uuid y claimg_uuid.'
                });
            }
            const image = await this.claimImageUseCase.deleteClaimImage(cmp_uuid, cla_uuid, claimg_uuid);

            // Emitir evento por WebSockets
            this.socketAdapter.emitEvent('claim-image:deleted', image);

            return res.status(200).json({
                success: true,
                message: 'Imagen del reclamo eliminada.',
                data: image
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (claim image controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la imagen del reclamo.',
                error: error.message,
            });
        }
    }
}
