import { ClaimImageRepository } from "../../domain/claim-image/claim-image.repository";
import { ClaimImageValue } from "../../domain/claim-image/claim-image.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ClaimImageUseCase {
    constructor(
        private readonly claimImageRepository: ClaimImageRepository,
    ) {
        this.getClaimImages = this.getClaimImages.bind(this);
        this.getDetailClaimImage = this.getDetailClaimImage.bind(this);
        this.createClaimImage = this.createClaimImage.bind(this);
        this.updateClaimImage = this.updateClaimImage.bind(this);
        this.deleteClaimImage = this.deleteClaimImage.bind(this);
    }

    public async getClaimImages(cmp_uuid: string, cla_uuid: string) {
        try {
            const images = await this.claimImageRepository.getClaimImages(cmp_uuid, cla_uuid);
            if (!images) {
                throw new Error('No hay imágenes de reclamos.');
            }
            return images.map(image => ({
                cmp_uuid: image.cmp_uuid,
                cla_uuid: image.cla_uuid,
                claimg_uuid: image.claimg_uuid,
                claimg_image: image.claimg_image,
                claimg_moment: image.claimg_moment,
                claimg_createdat: TimezoneConverter.toIsoStringInTimezone(image.claimg_createdat, 'America/Buenos_Aires'),
                claimg_updatedat: TimezoneConverter.toIsoStringInTimezone(image.claimg_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getClaimImages (use case):', error.message);
            throw error;
        }
    }

    public async getDetailClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string) {
        try {
            const image = await this.claimImageRepository.findClaimImageById(cmp_uuid, cla_uuid, claimg_uuid);
            if (!image) {
                throw new Error(`No hay imagen con ID: ${claimg_uuid}`);
            }
            return {
                cmp_uuid: image.cmp_uuid,
                cla_uuid: image.cla_uuid,
                claimg_uuid: image.claimg_uuid,
                claimg_image: image.claimg_image,
                claimg_moment: image.claimg_moment,
                claimg_createdat: TimezoneConverter.toIsoStringInTimezone(image.claimg_createdat, 'America/Buenos_Aires'),
                claimg_updatedat: TimezoneConverter.toIsoStringInTimezone(image.claimg_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailClaimImage (use case):', error.message);
            throw error;
        }
    }

    public async createClaimImage({ cmp_uuid, cla_uuid, claimg_uuid, claimg_image, claimg_moment }: { cmp_uuid: string, cla_uuid: string, claimg_uuid: string, claimg_image: string, claimg_moment: 'Antes' | 'Despues' }) {
        try {
            const imageValue = new ClaimImageValue({ cmp_uuid, cla_uuid, claimg_uuid, claimg_image, claimg_moment });
            const imageCreated = await this.claimImageRepository.createClaimImage(imageValue);
            if (!imageCreated) {
                throw new Error('No se pudo insertar la imagen del reclamo.');
            }
            return {
                cmp_uuid: imageCreated.cmp_uuid,
                cla_uuid: imageCreated.cla_uuid,
                claimg_uuid: imageCreated.claimg_uuid,
                claimg_image: imageCreated.claimg_image,
                claimg_moment: imageCreated.claimg_moment,
                claimg_createdat: TimezoneConverter.toIsoStringInTimezone(imageCreated.claimg_createdat, 'America/Buenos_Aires'),
                claimg_updatedat: TimezoneConverter.toIsoStringInTimezone(imageCreated.claimg_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createClaimImage (use case):', error.message);
            throw error;
        }
    }

    public async updateClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string, { claimg_image, claimg_moment }: { claimg_image: string, claimg_moment: 'Antes' | 'Despues' }) {
        try {
            const imageUpdated = await this.claimImageRepository.updateClaimImage(cmp_uuid, cla_uuid, claimg_uuid, { claimg_image, claimg_moment });
            if (!imageUpdated) {
                throw new Error('No se pudo actualizar la imagen del reclamo.');
            }
            return {
                cmp_uuid: imageUpdated.cmp_uuid,
                cla_uuid: imageUpdated.cla_uuid,
                claimg_uuid: imageUpdated.claimg_uuid,
                claimg_image: imageUpdated.claimg_image,
                claimg_moment: imageUpdated.claimg_moment,
                claimg_createdat: TimezoneConverter.toIsoStringInTimezone(imageUpdated.claimg_createdat, 'America/Buenos_Aires'),
                claimg_updatedat: TimezoneConverter.toIsoStringInTimezone(imageUpdated.claimg_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateClaimImage (use case):', error.message);
            throw error;
        }
    }

    public async deleteClaimImage(cmp_uuid: string, cla_uuid: string, claimg_uuid: string) {
        try {
            const imageDeleted = await this.claimImageRepository.deleteClaimImage(cmp_uuid, cla_uuid, claimg_uuid);
            if (!imageDeleted) {
                throw new Error('No se pudo eliminar la imagen del reclamo.');
            }
            return {
                cmp_uuid: imageDeleted.cmp_uuid,
                cla_uuid: imageDeleted.cla_uuid,
                claimg_uuid: imageDeleted.claimg_uuid,
                claimg_image: imageDeleted.claimg_image,
                claimg_moment: imageDeleted.claimg_moment,
                claimg_createdat: TimezoneConverter.toIsoStringInTimezone(imageDeleted.claimg_createdat, 'America/Buenos_Aires'),
                claimg_updatedat: TimezoneConverter.toIsoStringInTimezone(imageDeleted.claimg_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteClaimImage (use case):', error.message);
            throw error;
        }
    }
}
