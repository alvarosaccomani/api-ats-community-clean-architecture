import { v4 as uuid } from "uuid";
import moment from 'moment';
import { UserRolCompanyEntity } from "./user-rol-company.entity";

export class UserRolCompanyValue implements UserRolCompanyEntity {
    cmp_uuid: string;
    usr_uuid: string;
    rol_uuid: string;
    usrrolcmp_createdat: Date;
    usrrolcmp_updatedat: Date;
    
    constructor({
            cmp_uuid,
            usr_uuid,
            rol_uuid,
            usrrolcmp_createdat,
            usrrolcmp_updatedat
        }:{ 
            cmp_uuid: string,
            usr_uuid: string,
            rol_uuid: string,
            usrrolcmp_createdat?: Date,
            usrrolcmp_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.usr_uuid = usr_uuid;
        this.rol_uuid = rol_uuid;
        this.usrrolcmp_createdat = usrrolcmp_createdat ?? moment().toDate();
        this.usrrolcmp_updatedat = usrrolcmp_updatedat ?? moment().toDate();
    }
}