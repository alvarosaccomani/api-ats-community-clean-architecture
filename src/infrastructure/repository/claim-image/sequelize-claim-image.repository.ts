import { ClaimImageEntity, ClaimImageUpdateData } from "../../../domain/claim-image/claim-image.entity";
import { ClaimImageRepository } from "../../../domain/claim-image/claim-image.repository";
import { SequelizeClaimImage } from "../../model/claim-image/claim-image.model";

export class SequelizeRepository implements ClaimImageRepository {
    async getClaimImages(cmp_uuid: string, cla_uuid: string): Promise<ClaimImageEntity[] | null> {
        try {
            const images = await SequelizeClaimImage.findAll({
                where: {
                    cmp_uuid,
                    cla_uuid
                }
            });
            return images;
        } catch (error: any) {
            console.error('Error en getClaimImages:', error.message);
            throw error;
        }
    }

    async findClaimImageById(cmp_uuid: string, cla_uuid: string, claimg_uuid: string): Promise<ClaimImageEntity | null> {
        try {
            const image = await SequelizeClaimImage.findOne({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    claimg_uuid
                }
            });
            return image ? (image.dataValues as ClaimImageEntity) : null;
        } catch (error: any) {
            console.error('Error en findClaimImageById:', error.message);
            throw error;
        }
    }

    async createClaimImage(claimImage: ClaimImageEntity): Promise<ClaimImageEntity | null> {
        try {
            const { cmp_uuid, cla_uuid, claimg_uuid, claimg_image, claimg_moment, claimg_createdat, claimg_updatedat } = claimImage;
            const result = await SequelizeClaimImage.create({
                cmp_uuid,
                cla_uuid,
                claimg_uuid,
                claimg_image,
                claimg_moment,
                claimg_createdat,
                claimg_updatedat
            });
            if (!result) {
                throw new Error('No se pudo guardar la imagen del reclamo.');
            }
            return result.dataValues as ClaimImageEntity;
        } catch (error: any) {
            console.error('Error en createClaimImage:', error.message);
            throw error;
        }
    }

    async updateClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string, claimImage: ClaimImageUpdateData): Promise<ClaimImageEntity | null> {
        try {
            const [updatedCount, [updatedImage]] = await SequelizeClaimImage.update(
                {
                    claimg_image: claimImage.claimg_image,
                    claimg_moment: claimImage.claimg_moment
                },
                {
                    where: {
                        cmp_uuid,
                        cla_uuid,
                        claimg_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la imagen del reclamo.');
            }
            return updatedImage.get({ plain: true }) as ClaimImageEntity;
        } catch (error: any) {
            console.error('Error en updateClaimImage:', error.message);
            throw error;
        }
    }

    async deleteClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string): Promise<ClaimImageEntity | null> {
        try {
            const image = await this.findClaimImageById(cmp_uuid, cla_uuid, claimg_uuid);
            if (!image) {
                throw new Error(`No existe la imagen del reclamo con ID: ${claimg_uuid}`);
            }
            const result = await SequelizeClaimImage.destroy({
                where: {
                    cmp_uuid,
                    cla_uuid,
                    claimg_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la imagen del reclamo.');
            }
            return image;
        } catch (error: any) {
            console.error('Error en deleteClaimImage:', error.message);
            throw error;
        }
    }
}
