import { CompanySettingRepository } from "../../domain/company-setting/company-setting.repository";
import { CompanySettingValue } from "../../domain/company-setting/company-setting.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CompanySettingUseCase {
    constructor(
        private readonly companySettingRepository: CompanySettingRepository
    ) {
        this.getCompaniesSettings = this.getCompaniesSettings.bind(this);
        this.getDetailCompanySetting = this.getDetailCompanySetting.bind(this);
        this.createCompanySetting = this.createCompanySetting.bind(this);
        this.updateCompanySetting = this.updateCompanySetting.bind(this);
        this.deleteCompanySetting = this.deleteCompanySetting.bind(this);
        this.findCompanySettingByKey = this.findCompanySettingByKey.bind(this);
    }

    public async getCompaniesSettings(cmp_uuid: string) {
        try {
            const companiesSetting = await this.companySettingRepository.getCompaniesSettings(cmp_uuid);
            if(!companiesSetting) {
                throw new Error('No hay configuraciones de empresa.');
            }
            return companiesSetting.map(companySetting => ({
                cmp_uuid: companySetting.cmp_uuid,
                cmps_uuid: companySetting.cmps_uuid,
                cmps_key: companySetting.cmps_key,    
                cmps_parameter: companySetting.cmps_parameter,
                cmps_description: companySetting.cmps_description,
                cmps_value: companySetting.cmps_value,
                cmps_datatype: companySetting.cmps_datatype,
                cmps_options: companySetting.cmps_options,
                cmps_group: companySetting.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCompaniesSettings (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCompanySetting(cmp_uuid: string, cmps_uuid: string) {
        try {
            const companySetting = await this.companySettingRepository.findCompanySettingById(cmp_uuid, cmps_uuid);
            if(!companySetting) {
                throw new Error(`No hay configuración de empresa con el Id: ${cmps_uuid}`);
            }
            return {
                cmp_uuid: companySetting.cmp_uuid,
                cmps_uuid: companySetting.cmps_uuid,
                cmps_key: companySetting.cmps_key,    
                cmps_parameter: companySetting.cmps_parameter,
                cmps_description: companySetting.cmps_description,
                cmps_value: companySetting.cmps_value,
                cmps_datatype: companySetting.cmps_datatype,
                cmps_options: companySetting.cmps_options,
                cmps_group: companySetting.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySetting.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCompanySetting (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCompanySetting({ cmp_uuid, cmps_uuid, cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, cmps_options, cmps_group } : { cmp_uuid: string, cmps_uuid: string, cmps_key: string, cmps_parameter: string, cmps_description: string, cmps_value: string, cmps_datatype: string, cmps_options: string, cmps_group: string }) {
        try {
            const companySettingValue = new CompanySettingValue({ cmp_uuid, cmps_uuid, cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, cmps_options, cmps_group });
            const companySettingCreated = await this.companySettingRepository.createCompanySetting(companySettingValue);
            if(!companySettingCreated) {
                throw new Error(`No se pudo insertar la configuración de empresa.`);
            }
            return {
                cmp_uuid: companySettingCreated.cmp_uuid,
                cmps_uuid: companySettingCreated.cmps_uuid,
                cmps_key: companySettingCreated.cmps_key,    
                cmps_parameter: companySettingCreated.cmps_parameter,
                cmps_description: companySettingCreated.cmps_description,
                cmps_value: companySettingCreated.cmps_value,
                cmps_datatype: companySettingCreated.cmps_datatype,
                cmps_options: companySettingCreated.cmps_options,
                cmps_group: companySettingCreated.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySettingCreated.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySettingCreated.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCompanySetting(cmp_uuid: string, cmps_uuid: string, { cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, cmps_options, cmps_group } : { cmps_key: string, cmps_parameter: string, cmps_description: string, cmps_value: string, cmps_datatype: string, cmps_options: string, cmps_group: string }) {
        try {
            const companySettingUpdated = await this.companySettingRepository.updateCompanySetting(cmp_uuid, cmps_uuid, { cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, cmps_options, cmps_group });
            if(!companySettingUpdated) {
                throw new Error(`No se pudo actualizar la configuración de empresa.`);
            }
            return {
                cmp_uuid: companySettingUpdated.cmp_uuid,
                cmps_uuid: companySettingUpdated.cmps_uuid,
                cmps_key: companySettingUpdated.cmps_key,    
                cmps_parameter: companySettingUpdated.cmps_parameter,
                cmps_description: companySettingUpdated.cmps_description,
                cmps_value: companySettingUpdated.cmps_value,
                cmps_datatype: companySettingUpdated.cmps_datatype,
                cmps_options: companySettingUpdated.cmps_options,
                cmps_group: companySettingUpdated.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySettingUpdated.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySettingUpdated.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCompanySetting (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCompanySetting(cmp_uuid: string, cmps_uuid: string) {
        try {
            const companySettingDeleted = await this.companySettingRepository.deleteCompanySetting(cmp_uuid, cmps_uuid);
            if(!companySettingDeleted) {
                throw new Error(`No se pudo eliminar la configuración de empresa.`);
            }
            return {
                cmp_uuid: companySettingDeleted.cmp_uuid,
                cmps_uuid: companySettingDeleted.cmps_uuid,
                cmps_key: companySettingDeleted.cmps_key,    
                cmps_parameter: companySettingDeleted.cmps_parameter,
                cmps_description: companySettingDeleted.cmps_description,
                cmps_value: companySettingDeleted.cmps_value,
                cmps_datatype: companySettingDeleted.cmps_datatype,
                cmps_options: companySettingDeleted.cmps_options,
                cmps_group: companySettingDeleted.cmps_group,
                cmps_createdat: TimezoneConverter.toIsoStringInTimezone(companySettingDeleted.cmps_createdat, 'America/Buenos_Aires'),
                cmps_updatedat: TimezoneConverter.toIsoStringInTimezone(companySettingDeleted.cmps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteCompanySetting (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCompanySettingByKey(cmp_uuid: string, cmps_key: string, excludeUuid?: string) {
        try {
            const companySetting = await this.companySettingRepository.findCompanySettingByKey(cmp_uuid, cmps_key, excludeUuid)
            if(companySetting) {
                throw new Error(`Ya existe una configuración de empresa con la key ${cmps_key}.`);
            }
            return companySetting
        } catch (error: any) {
            console.error('Error en findCompanySettingByKey (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}