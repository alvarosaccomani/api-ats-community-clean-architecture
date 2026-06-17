import { SiteEntity, SiteUpdateData } from "./site.entity";

export interface SiteRepository {
    getSites(cmp_uuid: string): Promise<SiteEntity[] | null>;
    findSiteById(cmp_uuid: string, sit_uuid: string): Promise<SiteEntity | null>;
    createSite(site: SiteEntity): Promise<SiteEntity | null>;
    updateSite(cmp_uuid: string, sit_uuid: string, site: SiteUpdateData): Promise<SiteEntity | null>;
    deleteSite(cmp_uuid: string, sit_uuid: string): Promise<SiteEntity | null>;
}