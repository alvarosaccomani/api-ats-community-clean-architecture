import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ResourceTypeEntity } from "./resource-type.entity";

export class ResourceTypeValue implements ResourceTypeEntity {
    rety_uuid: string;
    rety_name: string;
    rety_description: string;
    rety_createdat: Date;
    rety_updatedat: Date;
    
    constructor({
            rety_uuid,
            rety_name,
            rety_description,
            rety_createdat,
            rety_updatedat
        }:{ 
            rety_uuid: string,
            rety_name: string,
            rety_description: string,
            rety_createdat?: Date,
            rety_updatedat?: Date
        }) {
        this.rety_uuid = uuid();
        this.rety_name = rety_name;
        this.rety_description = rety_description;
        this.rety_createdat = rety_createdat ?? moment().toDate();
        this.rety_updatedat = rety_updatedat ?? moment().toDate();
    }
}