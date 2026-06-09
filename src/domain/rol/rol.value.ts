import { v4 as uuid } from "uuid";
import moment from 'moment';
import { RolEntity } from "./rol.entity";

export class RolValue implements RolEntity {
    rol_uuid: string;
    rol_name: string;
    rol_createdat: Date;
    rol_updatedat: Date;
    
    constructor({
            rol_uuid,
            rol_name,
            rol_createdat,
            rol_updatedat
        }:{ 
            rol_uuid: string,
            rol_name: string,
            rol_createdat?: Date,
            rol_updatedat?: Date
        }) {
        this.rol_uuid = uuid();
        this.rol_name = rol_name;
        this.rol_createdat = rol_createdat ?? moment().toDate();
        this.rol_updatedat = rol_updatedat ?? moment().toDate();
    }
}