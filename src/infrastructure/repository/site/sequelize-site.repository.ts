import { SiteEntity, SiteUpdateData } from "../../../domain/site/site.entity";
import { SiteRepository } from "../../../domain/site/site.repository";
import { SequelizeSite } from "../../model/site/site.model";

export class SequelizeSiteRepository implements SiteRepository {
    async getSites(cmp_uuid: string): Promise<SiteEntity[] | null> {
        try {
            const sites = await SequelizeSite.findAll({
                where: { cmp_uuid },
                order: [['sit_name', 'ASC']]
            });
            return sites;
        } catch (error: any) {
            console.error('Error en getSites:', error.message);
            throw error;
        }
    }

    async findSiteById(cmp_uuid: string, sit_uuid: string): Promise<SiteEntity | null> {
        try {
            const site = await SequelizeSite.findOne({
                where: { cmp_uuid, sit_uuid }
            });
            return site ? (site.dataValues as SiteEntity) : null;
        } catch (error: any) {
            console.error('Error en findSiteById:', error.message);
            throw error;
        }
    }

    async createSite(site: SiteEntity): Promise<SiteEntity | null> {
        try {
            const { sit_uuid, cmp_uuid, sit_name, sit_address, sit_status } = site;
            const result = await SequelizeSite.create({
                sit_uuid,
                cmp_uuid,
                sit_name,
                sit_address,
                sit_status
            });
            return result ? (result.dataValues as SiteEntity) : null;
        } catch (error: any) {
            console.error('Error en createSite:', error.message);
            throw error;
        }
    }

    async updateSite(cmp_uuid: string, sit_uuid: string, site: SiteUpdateData): Promise<SiteEntity | null> {
        try {
            const [updatedCount, [updatedSite]] = await SequelizeSite.update(
                {
                    sit_name: site.sit_name,
                    sit_address: site.sit_address,
                    sit_status: site.sit_status
                },
                {
                    where: { cmp_uuid, sit_uuid },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la sede.');
            }
            return updatedSite.get({ plain: true }) as SiteEntity;
        } catch (error: any) {
            console.error('Error en updateSite:', error.message);
            throw error;
        }
    }

    async deleteSite(cmp_uuid: string, sit_uuid: string): Promise<SiteEntity | null> {
        try {
            const site = await this.findSiteById(cmp_uuid, sit_uuid);
            if (!site) {
                throw new Error(`No existe la sede con ID: ${sit_uuid}`);
            }
            const result = await SequelizeSite.destroy({
                where: { cmp_uuid, sit_uuid }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la sede.');
            }
            return site;
        } catch (error: any) {
            console.error('Error en deleteSite:', error.message);
            throw error;
        }
    }
}
