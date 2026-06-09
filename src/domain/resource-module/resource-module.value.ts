import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ResourceModuleEntity } from "./resource-module.entity";

export class ResourceModuleValue implements ResourceModuleEntity {
    remo_uuid: string;
    remo_name: string;
    remo_description: string;
    remo_createdat: Date;
    remo_updatedat: Date;
    
    constructor({
            remo_uuid,
            remo_name,
            remo_description,
            remo_createdat,
            remo_updatedat
        }:{ 
            remo_uuid: string,
            remo_name: string,
            remo_description: string,
            remo_createdat?: Date,
            remo_updatedat?: Date
        }) {
        this.remo_uuid = uuid();
        this.remo_name = remo_name;
        this.remo_description = remo_description;
        this.remo_createdat = remo_createdat ?? moment().toDate();
        this.remo_updatedat = remo_updatedat ?? moment().toDate();
    }
}