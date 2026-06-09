import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CompanySettingEntity } from "./company-setting.entity";

export class CompanySettingValue implements CompanySettingEntity {
    cmp_uuid: string;
    cmps_uuid: string;
    cmps_key: string;
    cmps_parameter: string;
    cmps_description: string;
    cmps_value: string;
    cmps_datatype: string;
    cmps_options: string;
    cmps_group: string;
    cmps_createdat: Date;
    cmps_updatedat: Date
    
    constructor({
            cmp_uuid,
            cmps_uuid,
            cmps_key,    
            cmps_parameter,
            cmps_description,
            cmps_value,
            cmps_datatype,
            cmps_options,
            cmps_group,
            cmps_createdat,
            cmps_updatedat
        }:{ 
            cmp_uuid: string,
            cmps_uuid: string,
            cmps_key: string,    
            cmps_parameter: string,
            cmps_description: string,
            cmps_value: string,
            cmps_datatype: string,
            cmps_options: string,
            cmps_group: string,
            cmps_createdat?: Date,
            cmps_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cmps_uuid = uuid();
        this.cmps_key = cmps_key;    
        this.cmps_parameter = cmps_parameter;
        this.cmps_description = cmps_description;
        this.cmps_value = cmps_value;
        this.cmps_datatype = cmps_datatype;
        this.cmps_options = cmps_options;
        this.cmps_group = cmps_group;
        this.cmps_createdat = cmps_createdat ?? moment().toDate();
        this.cmps_updatedat = cmps_updatedat ?? moment().toDate();
    }
}