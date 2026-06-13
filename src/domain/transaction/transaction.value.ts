import { v4 as uuid } from "uuid";
import moment from 'moment';
import { TransactionEntity } from "./transaction.entity";

export class TransactionValue implements TransactionEntity {
    cmp_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    usruni_uuid: string;
    fee_uuid: string;
    tra_uuid: string;
    tra_gatewayid: string;
    tra_totalamount: number;
    tra_platformfee: number;
    tra_recipientamount: number;
    tra_status: 'Approved' | 'Pending' | 'Rejected';
    tra_createdat: Date
    
    constructor({
            cmp_uuid,
            usr_uuid,
            uni_uuid,
            usruni_uuid,
            fee_uuid,
            tra_uuid,
            tra_gatewayid,
            tra_totalamount,
            tra_platformfee,
            tra_recipientamount,
            tra_status,
            tra_createdat

        }:{ 
            cmp_uuid: string,
            usr_uuid: string,
            uni_uuid: string,
            usruni_uuid: string,
            fee_uuid: string,
            tra_uuid: string,
            tra_gatewayid: string,
            tra_totalamount: number,
            tra_platformfee: number,
            tra_recipientamount: number,
            tra_status: 'Approved' | 'Pending' | 'Rejected'
            tra_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.usr_uuid = usr_uuid;
        this.uni_uuid = uni_uuid;
        this.usruni_uuid = usruni_uuid;
        this.fee_uuid = fee_uuid;
        this.tra_uuid = uuid();
        this.tra_gatewayid = tra_gatewayid;
        this.tra_totalamount = tra_totalamount;
        this.tra_platformfee = tra_platformfee;
        this.tra_recipientamount = tra_recipientamount;
        this.tra_status = tra_status;
        this.tra_createdat = tra_createdat ?? moment().toDate();
    }
}