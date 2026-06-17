import { ReservationEntity, ReservationUpdateData } from "./reservation.entity";

export interface ReservationRepository {
    getReservationsBySpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string): Promise<ReservationEntity[] | null>;
    getReservationsByUser(cmp_uuid: string, usr_uuid: string): Promise<ReservationEntity[] | null>;
    getReservationsByCompany(cmp_uuid: string): Promise<ReservationEntity[] | null>;
    findReservationById(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string): Promise<ReservationEntity | null>;
    createReservation(reservation: ReservationEntity): Promise<ReservationEntity | null>;
    updateReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string, reservation: ReservationUpdateData): Promise<ReservationEntity | null>;
    deleteReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string): Promise<ReservationEntity | null>;
    checkOverlap(cmp_uuid: string, sit_uuid: string, spa_uuid: string, res_date: string | Date, res_slot: string): Promise<boolean>;
}