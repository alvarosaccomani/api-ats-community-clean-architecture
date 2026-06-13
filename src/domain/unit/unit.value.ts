import { v4 as uuid } from "uuid";
import moment from 'moment';
import { UnitEntity } from "./unit.entity";

export class UnitValue implements UnitEntity {
    cmp_uuid: string;
    uni_uuid: string;
    uni_code: string;
    uni_category: 'Residencial' | 'Comercial' | 'Socio Pleno' | 'Socio Deportivo' | 'Espacio Comun' | 'Parcela';
    uni_status: 'Activo' | 'Inactivo' | 'En_Mantenimiento';
    uni_financialcoefficient: number;
    uni_baseamountcustom: number;
    uni_locationdetails: string;
    uni_metadata?: Record<string, any>;
    uni_istransferable: boolean;
    uni_createdat: Date;
    uni_updatedat: Date
    
    constructor({
            cmp_uuid,
            uni_uuid,
            uni_code,
            uni_category,
            uni_status,
            uni_financialcoefficient,
            uni_baseamountcustom,
            uni_locationdetails,
            uni_metadata,
            uni_istransferable,
            uni_createdat,
            uni_updatedat
        }:{ 
            cmp_uuid: string,
            uni_uuid: string,
            uni_code: string,
            uni_category: 'Residencial' | 'Comercial' | 'Socio Pleno' | 'Socio Deportivo' | 'Espacio Comun' | 'Parcela',
            uni_status: 'Activo' | 'Inactivo',
            uni_financialcoefficient: number,
            uni_baseamountcustom: number,
            uni_locationdetails: string,
            uni_metadata: Record<string, any>,
            uni_istransferable: boolean,
            uni_createdat?: Date,
            uni_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.uni_uuid = uuid();
        this.uni_code = uni_code;
        this.uni_category = uni_category;
        this.uni_status = uni_status;
        this.uni_financialcoefficient = uni_financialcoefficient;
        this.uni_baseamountcustom = uni_baseamountcustom;
        this.uni_locationdetails = uni_locationdetails;
        this.uni_metadata = uni_metadata;
        this.uni_istransferable = uni_istransferable;
        this.uni_createdat = uni_createdat ?? moment().toDate();
        this.uni_updatedat = uni_updatedat ?? moment().toDate();
    }
}