import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ChatRoomEntity } from "./chat-room.entity";

export class ChatRoomValue implements ChatRoomEntity {
    cmp_uuid: string;
    chr_uuid: string;
    chr_name: string;
    chr_type: 'Reclamos' | 'Consorcio' | 'Licitación';
    cla_uuid: string;
    ten_uuid: string;
    chr_createdat: Date
    
    constructor({
            cmp_uuid,
            chr_uuid,
            chr_name,
            chr_type,
            cla_uuid,
            ten_uuid,
            chr_createdat
        }:{ 
            cmp_uuid: string,
            chr_uuid: string,
            chr_name: string,
            chr_type: 'Reclamos' | 'Consorcio' | 'Licitación',
            cla_uuid: string,
            ten_uuid: string,
            chr_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.chr_uuid = uuid();
        this.chr_name = chr_name;
        this.chr_type = chr_type;
        this.cla_uuid = cla_uuid;
        this.ten_uuid = ten_uuid;
        this.chr_createdat = chr_createdat ?? moment().toDate();
    }
}