export interface ReservationEntity {
    cmp_uuid: string;
    sit_uuid: string;
    spa_uuid: string;
    usr_uuid: string;
    res_uuid: string;
    res_date: Date | string;
    res_slot: string;
    res_status: 'Aprobada' | 'Pendiente' | 'Cancelada';
    res_createdat?: Date;
    res_updatedat?: Date;
    space?: {
        spa_uuid: string;
        spa_name: string;
        spa_type: string;
    };
    usr?: {
        usr_uuid: string;
        usr_name: string;
        usr_surname: string;
    };
}

export type ReservationUpdateData = Pick<ReservationEntity, 'res_status'>;