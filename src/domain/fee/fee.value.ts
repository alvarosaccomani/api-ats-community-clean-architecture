import { v4 as uuid } from "uuid";
import moment from 'moment';
import { FeeEntity } from "./fee.entity";

export class FeeValue implements FeeEntity {
    cmp_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    usruni_uuid: string;
    fee_uuid: string;
    fee_period: string;
    fee_amount: number;
    fee_duedate: Date;
    fee_status: 'Pendiente' | 'Pagada' | 'Vencida';
    fee_createdat: Date
    
    constructor({
            cmp_uuid,
            usr_uuid,
            uni_uuid,
            usruni_uuid,
            fee_uuid,
            fee_period,
            fee_amount,
            fee_duedate,
            fee_status,
            fee_createdat

        }:{ 
            cmp_uuid: string,
            usr_uuid: string,
            uni_uuid: string,
            usruni_uuid: string,
            fee_uuid: string,
            fee_period: string,
            fee_amount: number,
            fee_duedate: Date,
            fee_status: 'Pendiente' | 'Pagada' | 'Vencida',
            fee_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.usr_uuid = usr_uuid;
        this.uni_uuid = uni_uuid;
        this.usruni_uuid = usruni_uuid;
        this.fee_uuid = uuid();
        this.fee_period = fee_period;
        this.fee_amount = fee_amount;
        this.fee_duedate = fee_duedate;
        this.fee_status = fee_status;
        this.fee_createdat = fee_createdat ?? moment().toDate();
    }
}