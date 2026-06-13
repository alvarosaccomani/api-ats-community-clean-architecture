import { v4 as uuid } from "uuid";
import moment from 'moment';
import { VoteEntity } from "./vote.entity";

export class VoteValue implements VoteEntity {
    cmp_uuid: string;
    cla_uuid: string;
    ten_uuid: string;
    usr_uuid: string;
    vto_uuid: string;
    tenopt_uuid: string;
    vto_createdat: Date
    
    constructor({
            cmp_uuid,
            cla_uuid,
            ten_uuid,
            usr_uuid,
            vto_uuid,
            tenopt_uuid,
            vto_createdat
        }:{ 
            cmp_uuid: string,
            cla_uuid: string,
            ten_uuid: string,
            usr_uuid: string,
            vto_uuid?: string,
            tenopt_uuid: string,
            vto_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cla_uuid = cla_uuid;
        this.ten_uuid = ten_uuid;
        this.usr_uuid = usr_uuid;
        this.vto_uuid = uuid();
        this.tenopt_uuid = tenopt_uuid;
        this.vto_createdat = vto_createdat ?? moment().toDate();
    }
}