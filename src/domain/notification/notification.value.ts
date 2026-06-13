import { v4 as uuid } from "uuid";
import moment from 'moment';
import { NotificationEntity } from "./notification.entity";

export class NotificationValue implements NotificationEntity {
    usr_uuid: string;
    ntf_uuid: string;
    cmp_uuid: string;
    ntf_title: string;
    ntf_message: string;
    ntf_type: string;
    ntf_isread: boolean;
    ntf_actionurl: string;   
    ntf_createdat: Date;
    
    constructor({
            usr_uuid,
            ntf_uuid,
            cmp_uuid,
            ntf_title,
            ntf_message,
            ntf_type,
            ntf_isread,
            ntf_actionurl,
            ntf_createdat
        }:{ 
            usr_uuid: string,
            ntf_uuid?: string,
            cmp_uuid: string,
            ntf_title: string,
            ntf_message: string,
            ntf_type: string,
            ntf_isread: boolean,
            ntf_actionurl: string,
            ntf_createdat?: Date
        }) {
            this.usr_uuid = usr_uuid;
            this.ntf_uuid = ntf_uuid ?? uuid();
            this.cmp_uuid = cmp_uuid;
            this.ntf_title = ntf_title;
            this.ntf_message = ntf_message;
            this.ntf_type = ntf_type;
            this.ntf_isread = ntf_isread;
            this.ntf_actionurl = ntf_actionurl;
            this.ntf_createdat = ntf_createdat ?? moment().toDate();
    }
}