import { v4 as uuid } from "uuid";
import moment from 'moment';
import { TenderEntity } from "./tender.entity";

export class TenderValue implements TenderEntity {
    cmp_uuid: string;
    cla_uuid: string;
    ten_uuid: string;
    ten_votingdeadline: Date;
    ten_status: 'Activa' | 'Cerrada' | 'Desierta';
    ten_createdat: Date;
    ten_updatedat: Date
    
    constructor({
            cmp_uuid,
            cla_uuid,
            ten_uuid,
            ten_votingdeadline,
            ten_status,
            ten_createdat,
            ten_updatedat
        }:{ 
            cmp_uuid: string,
            cla_uuid: string,
            ten_uuid: string,
            ten_votingdeadline: Date,
            ten_status:  'Activa' | 'Cerrada' | 'Desierta',
            ten_createdat?: Date,
            ten_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cla_uuid = cla_uuid;
        this.ten_uuid = uuid();
        this.ten_votingdeadline = ten_votingdeadline;
        this.ten_status = ten_status;
        this.ten_createdat = ten_createdat ?? moment().toDate();
        this.ten_updatedat = ten_updatedat ?? moment().toDate();
    }
}