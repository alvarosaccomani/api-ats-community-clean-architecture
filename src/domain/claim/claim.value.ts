import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ClaimEntity } from "./claim.entity";

export class ClaimValue implements ClaimEntity {
    cmp_uuid: string;
    cla_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    cla_title: string;
    cla_description: string;
    cla_type: 'Reclamo' | 'Sugerencia' | 'Propuesta';
    cla_status: 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado';
    cla_priority: 'Baja' | 'Media' | 'Alta';
    cla_createdat: Date;
    cla_updatedat: Date
    
    constructor({
            cmp_uuid,
            cla_uuid,
            usr_uuid,
            uni_uuid,
            cla_title,
            cla_description,
            cla_type,
            cla_status,
            cla_priority,
            cla_createdat,
            cla_updatedat
        }:{ 
            cmp_uuid: string,
            cla_uuid: string,
            usr_uuid: string,
            uni_uuid: string,
            cla_title: string,
            cla_description: string,
            cla_type: 'Reclamo' | 'Sugerencia' | 'Propuesta',
            cla_status: 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado',
            cla_priority?: 'Baja' | 'Media' | 'Alta',
            cla_createdat?: Date,
            cla_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cla_uuid = uuid();
        this.usr_uuid = usr_uuid;
        this.uni_uuid = uni_uuid;
        this.cla_title = cla_title;
        this.cla_description = cla_description;
        this.cla_type = cla_type;
        this.cla_status = cla_status;
        this.cla_priority = cla_priority ?? 'Media';
        this.cla_createdat = cla_createdat ?? moment().toDate();
        this.cla_updatedat = cla_updatedat ?? moment().toDate();
    }
}