import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ChatMessageEntity } from "./chat-message.entity";

export class ChatMessageValue implements ChatMessageEntity {
    cmp_uuid: string;
    chr_uuid: string;
    chrmsg_uuid: string;
    usr_uuid: string;
    chrmsg_text: string;
    chrmsg_isread: boolean;
    chrmsg_createdat: Date
    
    constructor({
            cmp_uuid,
            chr_uuid,
            chrmsg_uuid,
            usr_uuid,
            chrmsg_text,
            chrmsg_isread,
            chrmsg_createdat
        }:{ 
            cmp_uuid: string,
            chr_uuid: string,
            chrmsg_uuid: string,
            usr_uuid: string,
            chrmsg_text: string,
            chrmsg_isread: boolean,
            chrmsg_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.chr_uuid = chr_uuid;
        this.chrmsg_uuid = uuid();
        this.usr_uuid = usr_uuid;
        this.chrmsg_text = chrmsg_text;
        this.chrmsg_isread = chrmsg_isread;
        this.chrmsg_createdat = chrmsg_createdat ?? moment().toDate();
    }
}