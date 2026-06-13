import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ChatMemberUserEntity } from "./chat-member-user.entity";

export class ChatMemberUserValue implements ChatMemberUserEntity {
    cmp_uuid: string;
    chr_uuid: string;
    usr_uuid: string;
    chmu_joinedat: Date
    
    constructor({
            cmp_uuid,
            chr_uuid,
            usr_uuid,
            chmu_joinedat
        }:{ 
            cmp_uuid: string,
            chr_uuid: string,
            usr_uuid: string,
            chmu_joinedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.chr_uuid = chr_uuid;
        this.usr_uuid = usr_uuid;
        this.chmu_joinedat = chmu_joinedat ?? moment().toDate();
    }
}