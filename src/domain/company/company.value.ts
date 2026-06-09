import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CompanyEntity } from "./company.entity";

export class CompanyValue implements CompanyEntity {
    cmp_uuid: string;
    cmp_name: string;
    cmp_address: string;
    cmp_lat: number;
    cmp_lng: number;
    cmp_phone: string;
    cmp_email: string;
    cmp_slug: string;
    cmp_logo: string;
    cmp_banner: string;
    cmp_description: string;
    cmp_currency: string;
    cmp_whatsapp: string;
    cmp_instagram: string;
    cmp_facebook: string;
    cmp_allowbackorders: boolean;
    cmp_primarycolor: string;
    cmp_isfeatured: boolean;
    cmp_status: string;  //-- active, inactive, pending
    cmp_createdat: Date;
    cmp_updatedat: Date;
    
    constructor({
            cmp_uuid,
            cmp_name,
            cmp_address,
            cmp_lat,
            cmp_lng,
            cmp_phone,
            cmp_email,
            cmp_slug,
            cmp_logo,
            cmp_banner,
            cmp_description,
            cmp_currency,
            cmp_whatsapp,
            cmp_instagram,
            cmp_facebook,
            cmp_allowbackorders,
            cmp_primarycolor,
            cmp_isfeatured,
            cmp_status,
            cmp_createdat,
            cmp_updatedat
        }:{ 
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
            cmp_status: string,
            cmp_createdat?: Date,
            cmp_updatedat?: Date
        }) {
        this.cmp_uuid = uuid();
        this.cmp_name = cmp_name;
        this.cmp_address = cmp_address;
        this.cmp_lat = cmp_lat;
        this.cmp_lng = cmp_lng;
        this.cmp_phone = cmp_phone;
        this.cmp_email = cmp_email;
        this.cmp_slug = cmp_slug;
        this.cmp_logo = cmp_logo;
        this.cmp_banner = cmp_banner;
        this.cmp_description = cmp_description;
        this.cmp_currency = cmp_currency;
        this.cmp_whatsapp = cmp_whatsapp;
        this.cmp_instagram = cmp_instagram;
        this.cmp_facebook = cmp_facebook;
        this.cmp_allowbackorders = cmp_allowbackorders;
        this.cmp_primarycolor = cmp_primarycolor;
        this.cmp_isfeatured = cmp_isfeatured;
        this.cmp_status = cmp_status;
        this.cmp_createdat = cmp_createdat ?? moment().toDate();
        this.cmp_updatedat = cmp_updatedat ?? moment().toDate();
    }
}