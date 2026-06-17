import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ReservationEntity } from "./reservation.entity";

export class ReservationValue implements ReservationEntity {
    cmp_uuid: string;
    sit_uuid: string;
    spa_uuid: string;
    usr_uuid: string;
    res_uuid: string;
    res_date: Date;
    res_slot: string;
    res_status: 'Aprobada' | 'Pendiente' | 'Cancelada';
    res_createdat: Date;
    res_updatedat: Date;

    constructor({
        cmp_uuid,
        sit_uuid,
        spa_uuid,
        usr_uuid,
        res_uuid,
        res_date,
        res_slot,
        res_status,
        res_createdat,
        res_updatedat
    }: {
        cmp_uuid: string;
        sit_uuid: string;
        spa_uuid: string;
        usr_uuid: string;
        res_uuid?: string;
        res_date: string | Date;
        res_slot: string;
        res_status?: 'Aprobada' | 'Pendiente' | 'Cancelada';
        res_createdat?: Date;
        res_updatedat?: Date;
    }) {
        this.cmp_uuid = cmp_uuid;
        this.sit_uuid = sit_uuid;
        this.spa_uuid = spa_uuid;
        this.usr_uuid = usr_uuid;
        this.res_uuid = res_uuid ?? uuid();
        this.res_date = typeof res_date === 'string' ? moment(res_date).toDate() : res_date;
        this.res_slot = res_slot;
        this.res_status = res_status ?? 'Pendiente';
        this.res_createdat = res_createdat ?? moment().toDate();
        this.res_updatedat = res_updatedat ?? moment().toDate();
    }
}