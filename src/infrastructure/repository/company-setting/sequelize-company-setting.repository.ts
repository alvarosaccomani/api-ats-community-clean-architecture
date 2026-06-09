import { CompanySettingEntity, CompanySettingUpdateData } from "../../../domain/company-setting/company-setting.entity";
import { CompanySettingRepository } from "../../../domain/company-setting/company-setting.repository";
import { SequelizeCompanySetting } from "../../model/company-setting/company-setting.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CompanySettingRepository {
    async getCompaniesSettings(cmp_uuid: string): Promise<CompanySettingEntity[] | null> {
        try {
            const companiesSettings = await SequelizeCompanySetting.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!companiesSettings) {
                throw new Error(`No hay empresas configuraciones`)
            };
            return companiesSettings;
        } catch (error: any) {
            console.error('Error en getCompanies:', error.message);
            throw error;
        }
    }
    async findCompanySettingById(cmp_uuid: string, cmps_uuid: string): Promise<CompanySettingEntity | null> {
        try {
            const companySetting = await SequelizeCompanySetting.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cmps_uuid: cmps_uuid ?? null
                }
            });
            if(!companySetting) {
                throw new Error(`No hay empresa con el Id: ${cmp_uuid}`);
            };
            return companySetting.dataValues;
        } catch (error: any) {
            console.error('Error en findCompanySettingById:', error.message);
            throw error;
        }
    }
    async createCompanySetting(company: CompanySettingEntity): Promise<CompanySettingEntity | null> {
        try {
            let { cmp_uuid, cmps_uuid, cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, cmps_options, cmps_group, cmps_createdat, cmps_updatedat } = company
            const result = await SequelizeCompanySetting.create({ cmp_uuid, cmps_uuid, cmps_key, cmps_parameter, cmps_description, cmps_value, cmps_datatype, cmps_options, cmps_group, cmps_createdat, cmps_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la empresa configuracion`);
            }
            let newCompany = result.dataValues as SequelizeCompanySetting
            return newCompany;
        } catch (error: any) {
            console.error('Error en createCompanySetting:', error.message);
            throw error;
        }
    }
    async updateCompanySetting(cmp_uuid: string, cmps_uuid: string, companySetting: CompanySettingUpdateData): Promise<CompanySettingEntity | null> {
        try {
            const [updatedCount, [updatedCompanySetting]] = await SequelizeCompanySetting.update(
                { 
                    cmps_key: companySetting.cmps_key,
                    cmps_parameter: companySetting.cmps_parameter,
                    cmps_description: companySetting.cmps_description,
                    cmps_value: companySetting.cmps_value,
                    cmps_datatype: companySetting.cmps_datatype,
                    cmps_options: companySetting.cmps_options,
                    cmps_group: companySetting.cmps_group
                },
                { 
                    where: { cmp_uuid, cmps_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la empresa configuracion`);
            };
            return updatedCompanySetting.get({ plain: true }) as CompanySettingEntity;
        } catch (error: any) {
            console.error('Error en updateCompanySetting:', error.message);
            throw error;
        }
    }
    async deleteCompanySetting(cmp_uuid: string, cmps_uuid: string): Promise<CompanySettingEntity | null> {
        try {
            const companySetting = await this.findCompanySettingById(cmp_uuid, cmps_uuid);
            const result = await SequelizeCompanySetting.destroy({ where: { cmp_uuid, cmps_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la empresa configuracion`);
            };
            return companySetting;
        } catch (error: any) {
            console.error('Error en deleteCompany:', error.message);
            throw error;
        }
    }
    async findCompanySettingByKey(cmp_uuid: string, cmps_key: string, excludeUuid?: string): Promise<CompanySettingEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                cmps_key: cmps_key ?? null
             };
            if (excludeUuid) {
                whereCondition.cmp_uuid = { [Op.ne]: excludeUuid };
            }
            const companySetting = await SequelizeCompanySetting.findOne({ 
                where: whereCondition
            });
            return companySetting;
        } catch (error: any) {
            console.error('Error en findCompanySettingByName:', error.message);
            throw error;
        }
    }
}