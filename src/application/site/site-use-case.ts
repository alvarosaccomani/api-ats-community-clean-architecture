import { SiteRepository } from "../../domain/site/site.repository";
import { SiteValue } from "../../domain/site/site.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class SiteUseCase {
    constructor(
        private readonly siteRepository: SiteRepository,
    ) {
        this.getSites = this.getSites.bind(this);
        this.getDetailSite = this.getDetailSite.bind(this);
        this.createSite = this.createSite.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.deleteSite = this.deleteSite.bind(this);
    }

    public async getSites(cmp_uuid: string) {
        try {
            const sites = await this.siteRepository.getSites(cmp_uuid);
            if (!sites) {
                throw new Error('No hay sedes.');
            }
            return sites.map(site => ({
                sit_uuid: site.sit_uuid,
                cmp_uuid: site.cmp_uuid,
                sit_name: site.sit_name,
                sit_address: site.sit_address,
                sit_status: site.sit_status,
                sit_createdat: site.sit_createdat ? TimezoneConverter.toIsoStringInTimezone(site.sit_createdat, 'America/Buenos_Aires') : undefined,
                sit_updatedat: site.sit_updatedat ? TimezoneConverter.toIsoStringInTimezone(site.sit_updatedat, 'America/Buenos_Aires') : undefined,
            }));
        } catch (error: any) {
            console.error('Error en getSites (use case):', error.message);
            throw error;
        }
    }

    public async getDetailSite(cmp_uuid: string, sit_uuid: string) {
        try {
            const site = await this.siteRepository.findSiteById(cmp_uuid, sit_uuid);
            if (!site) {
                throw new Error(`No hay sede con ID: ${sit_uuid}`);
            }
            return {
                sit_uuid: site.sit_uuid,
                cmp_uuid: site.cmp_uuid,
                sit_name: site.sit_name,
                sit_address: site.sit_address,
                sit_status: site.sit_status,
                sit_createdat: site.sit_createdat ? TimezoneConverter.toIsoStringInTimezone(site.sit_createdat, 'America/Buenos_Aires') : undefined,
                sit_updatedat: site.sit_updatedat ? TimezoneConverter.toIsoStringInTimezone(site.sit_updatedat, 'America/Buenos_Aires') : undefined,
            };
        } catch (error: any) {
            console.error('Error en getDetailSite (use case):', error.message);
            throw error;
        }
    }

    public async createSite({ cmp_uuid, sit_name, sit_address, sit_status }: { cmp_uuid: string, sit_name: string, sit_address: string, sit_status?: 'Activo' | 'Inactivo' }) {
        try {
            const siteValue = new SiteValue({ cmp_uuid, sit_name, sit_address, sit_status });
            const siteCreated = await this.siteRepository.createSite(siteValue);
            if (!siteCreated) {
                throw new Error('No se pudo insertar la sede.');
            }
            return {
                sit_uuid: siteCreated.sit_uuid,
                cmp_uuid: siteCreated.cmp_uuid,
                sit_name: siteCreated.sit_name,
                sit_address: siteCreated.sit_address,
                sit_status: siteCreated.sit_status,
            };
        } catch (error: any) {
            console.error('Error en createSite (use case):', error.message);
            throw error;
        }
    }

    public async updateSite(cmp_uuid: string, sit_uuid: string, { sit_name, sit_address, sit_status }: { sit_name: string, sit_address: string, sit_status: 'Activo' | 'Inactivo' }) {
        try {
            const siteUpdated = await this.siteRepository.updateSite(cmp_uuid, sit_uuid, { sit_name, sit_address, sit_status });
            if (!siteUpdated) {
                throw new Error('No se pudo actualizar la sede.');
            }
            return {
                sit_uuid: siteUpdated.sit_uuid,
                cmp_uuid: siteUpdated.cmp_uuid,
                sit_name: siteUpdated.sit_name,
                sit_address: siteUpdated.sit_address,
                sit_status: siteUpdated.sit_status,
            };
        } catch (error: any) {
            console.error('Error en updateSite (use case):', error.message);
            throw error;
        }
    }

    public async deleteSite(cmp_uuid: string, sit_uuid: string) {
        try {
            const siteDeleted = await this.siteRepository.deleteSite(cmp_uuid, sit_uuid);
            if (!siteDeleted) {
                throw new Error('No se pudo eliminar la sede.');
            }
            return {
                sit_uuid: siteDeleted.sit_uuid,
                cmp_uuid: siteDeleted.cmp_uuid,
                sit_name: siteDeleted.sit_name,
                sit_address: siteDeleted.sit_address,
                sit_status: siteDeleted.sit_status,
            };
        } catch (error: any) {
            console.error('Error en deleteSite (use case):', error.message);
            throw error;
        }
    }
}
