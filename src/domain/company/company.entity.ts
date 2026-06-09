import { CompanySettingEntity } from "../company-setting/company-setting.entity"

export interface CompanyEntity {
    cmp_uuid: string,
    cmp_name: string,
    cmp_address: string,
    cmp_lat: number,
    cmp_lng: number,
    cmp_phone: string,
    cmp_email: string,
    cmp_slug: string,
    cmp_logo: string,
    cmp_banner: string,
    cmp_description: string,
    cmp_currency: string,
    cmp_whatsapp: string,
    cmp_instagram: string,
    cmp_facebook: string,
    cmp_allowbackorders: boolean,
    cmp_primarycolor: string,
    cmp_isfeatured: boolean,
    cmp_status: string,  //-- active, inactive, pending
    cmp_createdat: Date,
    cmp_updatedat: Date,
    companySettings?: CompanySettingEntity[]
}

//Update
export type CompanyUpdateData = Pick<CompanyEntity, 'cmp_name' | 'cmp_address' | 'cmp_lat' | 'cmp_lng' | 'cmp_phone' | 'cmp_email' | 'cmp_slug' | 'cmp_logo' | 'cmp_banner' | 'cmp_description' | 'cmp_currency' | 'cmp_whatsapp' | 'cmp_instagram' | 'cmp_facebook' | 'cmp_allowbackorders' | 'cmp_primarycolor' | 'cmp_isfeatured' | 'cmp_status'>;
