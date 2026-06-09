import { v4 as uuid } from "uuid";
import moment from 'moment';
import { PermissionEntity } from "./permission.entity";

export class PermissionValue implements PermissionEntity {
    per_uuid: string;
    per_slug: string;
    per_description: string;
    rety_uuid: string;
    remo_uuid: string;
    per_createdat: Date;
    per_updatedat: Date;
    
    constructor({
            per_uuid,
            per_slug,
            per_description,
            rety_uuid,
            remo_uuid,
            per_createdat,
            per_updatedat
        }:{ 
            per_uuid: string,
            per_slug: string,
            per_description: string,
            rety_uuid: string,
            remo_uuid: string,
            per_createdat?: Date,
            per_updatedat?: Date
        }) {
        this.per_uuid = uuid();
        this.per_slug = per_slug;
        this.per_description = per_description;
        this.rety_uuid = rety_uuid;
        this.remo_uuid = remo_uuid;
        this.per_createdat = per_createdat ?? moment().toDate();
        this.per_updatedat = per_updatedat ?? moment().toDate();
    }
}