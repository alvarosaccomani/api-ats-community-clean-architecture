import { v4 as uuid } from "uuid";
import moment from 'moment';
import { TenderOptionEntity } from "./tender-option.entity";

export class TenderOptionValue implements TenderOptionEntity {
    cmp_uuid: string;
    cla_uuid: string;
    ten_uuid: string;
    tenopt_uuid: string;
    tenopt_providername: string;
    tenopt_amount: number;
    tenopt_details: string;
    tenopt_createdat: Date;
    tenopt_updatedat: Date
    
    constructor({
            cmp_uuid,
            cla_uuid,
            ten_uuid,
            tenopt_uuid,
            tenopt_providername,
            tenopt_amount,
            tenopt_details,
            tenopt_createdat,
            tenopt_updatedat
        }:{ 
            cmp_uuid: string,
            cla_uuid: string,
            ten_uuid: string,
            tenopt_uuid: string,
            tenopt_providername: string,
            tenopt_amount: number,
            tenopt_details: string,
            tenopt_createdat?: Date,
            tenopt_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cla_uuid = cla_uuid;
        this.ten_uuid = ten_uuid;
        this.tenopt_uuid = uuid();
        this.tenopt_providername = tenopt_providername;
        this.tenopt_amount = tenopt_amount;
        this.tenopt_details = tenopt_details;
        this.tenopt_createdat = tenopt_createdat ?? moment().toDate();
        this.tenopt_updatedat = tenopt_updatedat ?? moment().toDate();
    }
}