import { v4 as uuid } from "uuid";
import moment from 'moment';
import { UserUnitEntity } from "./user-unit.entity";

export class UserUnitValue implements UserUnitEntity {
    cmp_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    usruni_uuid: string;
    usruni_relationtype: 'Propietario' | 'Copropietario' | 'Inquilino' | 'Socio Principal';
    usruni_isactive: boolean;
    usruni_startdate: Date;
    usruni_enddate: Date;
    usruni_createdat: Date;
    usruni_updatedat: Date
    
    constructor({
            cmp_uuid,
            usr_uuid,
            uni_uuid,
            usruni_uuid,
            usruni_relationtype,
            usruni_isactive,
            usruni_startdate,
            usruni_enddate,
            usruni_createdat,
            usruni_updatedat
        }:{ 
            cmp_uuid: string,
            usr_uuid: string,
            uni_uuid: string,
            usruni_uuid: string,
            usruni_relationtype: 'Propietario' | 'Copropietario' | 'Inquilino' | 'Socio Principal',
            usruni_isactive: boolean,
            usruni_startdate: Date,
            usruni_enddate: Date,
            usruni_createdat?: Date,
            usruni_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.usr_uuid = usr_uuid;
        this.uni_uuid = uni_uuid;
        this.usruni_uuid = uuid();
        this.usruni_relationtype = usruni_relationtype;
        this.usruni_isactive = usruni_isactive;
        this.usruni_startdate = usruni_startdate;
        this.usruni_enddate = usruni_enddate;
        this.usruni_createdat = usruni_createdat ?? moment().toDate();
        this.usruni_updatedat = usruni_updatedat ?? moment().toDate();
    }
}