import { CompanyEntity, CompanyUpdateData } from "../../../domain/company/company.entity";
import { CompanyRepository } from "../../../domain/company/company.repository";
import { SequelizeCompany } from "../../model/company/company.model";
import { SequelizeCompanySetting } from "../../model/company-setting/company-setting.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CompanyRepository {
    async getCompanies(): Promise<CompanyEntity[] | null> {
        try {
            const companies = await SequelizeCompany.findAll();
            if(!companies) {
                throw new Error(`No hay empresas`)
            };
            return companies;
        } catch (error: any) {
            console.error('Error en getCompanies:', error.message);
            throw error;
        }
    }
    async findCompanyById(cmp_uuid: string): Promise<CompanyEntity | null> {
        try {
            const company = await SequelizeCompany.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null
                }
            });
            if(!company) {
                throw new Error(`No hay empresa con el Id: ${cmp_uuid}`);
            };
            return company.dataValues;
        } catch (error: any) {
            console.error('Error en findCompanyById:', error.message);
            throw error;
        }
    }
    async createCompany(company: CompanyEntity): Promise<CompanyEntity | null> {
        try {
            let { cmp_uuid, cmp_name, cmp_address, cmp_lat, cmp_lng, cmp_phone, cmp_email, cmp_slug, cmp_logo, cmp_banner, cmp_description, cmp_currency, cmp_whatsapp, cmp_instagram, cmp_facebook, cmp_allowbackorders, cmp_primarycolor, cmp_isfeatured, cmp_status, cmp_createdat, cmp_updatedat } = company
            const result = await SequelizeCompany.create({ cmp_uuid, cmp_name, cmp_address, cmp_lat, cmp_lng, cmp_phone, cmp_email, cmp_slug, cmp_logo, cmp_banner, cmp_description, cmp_currency, cmp_whatsapp, cmp_instagram, cmp_facebook, cmp_allowbackorders, cmp_primarycolor, cmp_isfeatured, cmp_status, cmp_createdat, cmp_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la empresa`);
            }
            let newCompany = result.dataValues as SequelizeCompany
            return newCompany;
        } catch (error: any) {
            console.error('Error en createCompany:', error.message);
            throw error;
        }
    }
    async updateCompany(cmp_uuid: string, company: CompanyUpdateData): Promise<CompanyEntity | null> {
        try {
            const [updatedCount, [updatedCompany]] = await SequelizeCompany.update(
                { 
                    cmp_name: company.cmp_name,
                    cmp_address: company.cmp_address,
                    cmp_lat: company.cmp_lat,
                    cmp_lng: company.cmp_lng,
                    cmp_phone: company.cmp_phone,
                    cmp_email: company.cmp_email,
                    cmp_slug: company.cmp_slug,
                    cmp_logo: company.cmp_logo,
                    cmp_banner: company.cmp_banner,
                    cmp_description: company.cmp_description,
                    cmp_currency: company.cmp_currency,
                    cmp_whatsapp: company.cmp_whatsapp,
                    cmp_instagram: company.cmp_instagram,
                    cmp_facebook: company.cmp_facebook,
                    cmp_allowbackorders: company.cmp_allowbackorders,
                    cmp_primarycolor: company.cmp_primarycolor,
                    cmp_isfeatured: company.cmp_isfeatured,
                    cmp_status: company.cmp_status
                },
                { 
                    where: { cmp_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la empresa`);
            };
            return updatedCompany.get({ plain: true }) as CompanyEntity;
        } catch (error: any) {
            console.error('Error en updateCompany:', error.message);
            throw error;
        }
    }
    async deleteCompany(cmp_uuid: string): Promise<CompanyEntity | null> {
        try {
            const company = await this.findCompanyById(cmp_uuid);
            const result = await SequelizeCompany.destroy({ where: { cmp_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la empresa`);
            };
            return company;
        } catch (error: any) {
            console.error('Error en deleteCompany:', error.message);
            throw error;
        }
    }
    async findCompanyByName(cmp_name: string, excludeUuid?: string): Promise<CompanyEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_name: cmp_name ?? null
             };
            if (excludeUuid) {
                whereCondition.cmp_uuid = { [Op.ne]: excludeUuid };
            }
            const company = await SequelizeCompany.findOne({ 
                where: whereCondition
            });
            return company;
        } catch (error: any) {
            console.error('Error en findCompanyByName:', error.message);
            throw error;
        }
    }
    async findCompanyBySlug(cmp_slug: string, excludeUuid?: string): Promise<CompanyEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_slug: cmp_slug ?? null
             };
            if (excludeUuid) {
                whereCondition.cmp_uuid = { [Op.ne]: excludeUuid };
            }
            const company = await SequelizeCompany.findOne({ 
                where: whereCondition
            });
            return company;
        } catch (error: any) {
            console.error('Error en findCompanyBySlug:', error.message);
            throw error;
        }
    }
    async getCompanyBySlug(cmp_slug: string): Promise<CompanyEntity | null> {
        try {
            const company = await SequelizeCompany.findOne({ 
                where: { 
                    cmp_slug: cmp_slug ?? null
                },
                include: [
                    { 
                        as: 'companySettings', 
                        model: SequelizeCompanySetting
                    }
                ]
            });
            if(!company) {
                throw new Error(`No hay empresa con el slug: ${cmp_slug}`);
            };
            return company.dataValues;
        } catch (error: any) {
            console.error('Error en getCompanyBySlug:', error.message);
            throw error;
        }
    }
    async getFeaturedCompanies(): Promise<CompanyEntity[] | null> {
        try {
            const companies = await SequelizeCompany.findAll({ 
                where: { 
                    cmp_isfeatured: true
                }
            });
            if(!companies) {
                throw new Error(`No hay empresas destacadas`);
            };
            return companies.map(company => company.dataValues);
        } catch (error: any) {
            console.error('Error en getFeaturedCompanies:', error.message);
            throw error;
        }
    }

    
}