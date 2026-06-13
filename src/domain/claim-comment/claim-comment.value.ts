import { v4 as uuid } from "uuid";
import moment from "moment";
import { ClaimCommentEntity } from "./claim-comment.entity";

export class ClaimCommentValue implements ClaimCommentEntity {
    cmp_uuid: string;
    cla_uuid: string;
    clac_uuid: string;
    usr_uuid: string;
    clac_text: string;
    clac_createdat: Date;

    constructor({
        cmp_uuid,
        cla_uuid,
        clac_uuid,
        usr_uuid,
        clac_text,
        clac_createdat
    }: {
        cmp_uuid: string;
        cla_uuid: string;
        clac_uuid?: string;
        usr_uuid: string;
        clac_text: string;
        clac_createdat?: Date;
    }) {
        this.cmp_uuid = cmp_uuid;
        this.cla_uuid = cla_uuid;
        this.clac_uuid = clac_uuid ?? uuid();
        this.usr_uuid = usr_uuid;
        this.clac_text = clac_text;
        this.clac_createdat = clac_createdat ?? moment().toDate();
    }
}
