import { v4 as uuid } from "uuid";
import moment from 'moment';
import { RolPermissionEntity } from "./rol-permission.entity";

export class RolPermissionValue implements RolPermissionEntity {
    rol_uuid: string;
    per_uuid: string;
    rolper_createdat: Date;
    rolper_updatedat: Date;
    
    constructor({
            rol_uuid,
            per_uuid,
            rolper_createdat,
            rolper_updatedat
        }:{ 
            rol_uuid: string,
            per_uuid: string,
            rolper_createdat?: Date,
            rolper_updatedat?: Date
        }) {
        this.rol_uuid = rol_uuid;
        this.per_uuid = per_uuid;
        this.rolper_createdat = rolper_createdat ?? moment().toDate();
        this.rolper_updatedat = rolper_updatedat ?? moment().toDate();
    }
}