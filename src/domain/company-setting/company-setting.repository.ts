import { CompanySettingEntity, CompanySettingUpdateData } from "./company-setting.entity";

export interface CompanySettingRepository {
    getCompaniesSettings(cmp_uuid: string): Promise<CompanySettingEntity[] | null>;
    findCompanySettingById(cmp_uuid: string, cmps_uuid: string): Promise<CompanySettingEntity | null>;
    createCompanySetting(companySetting: CompanySettingEntity): Promise<CompanySettingEntity | null>;
    updateCompanySetting(cmp_uuid: string, cmps_uuid: string, companySetting: CompanySettingUpdateData): Promise<CompanySettingEntity | null>;
    deleteCompanySetting(cmp_uuid: string, cmps_uuid: string): Promise<CompanySettingEntity | null>;
    findCompanySettingByKey(cmp_uuid: string, cmps_key: string, excludeUuid?: string | null): Promise<CompanySettingEntity | null>;
}