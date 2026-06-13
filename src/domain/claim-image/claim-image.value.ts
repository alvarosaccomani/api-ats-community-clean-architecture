import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ClaimImageEntity } from "./claim-image.entity";

export class ClaimImageValue implements ClaimImageEntity {
    cmp_uuid: string;
    cla_uuid: string;
    claimg_uuid: string;
    claimg_image: string;
    claimg_moment: 'Antes' | 'Despues';
    claimg_createdat: Date;
    claimg_updatedat: Date
    
    constructor({
            cmp_uuid,
            cla_uuid,
            claimg_uuid,
            claimg_image,
            claimg_moment,
            claimg_createdat,
            claimg_updatedat
        }:{ 
            cmp_uuid: string,
            cla_uuid: string,
            claimg_uuid: string,
            claimg_image: string,
            claimg_moment:  'Antes' | 'Despues',
            claimg_createdat?: Date,
            claimg_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cla_uuid = cla_uuid;
        this.claimg_uuid = uuid();
        this.claimg_image = claimg_image;
        this.claimg_moment = claimg_moment;
        this.claimg_createdat = claimg_createdat ?? moment().toDate();
        this.claimg_updatedat = claimg_updatedat ?? moment().toDate();
    }
}