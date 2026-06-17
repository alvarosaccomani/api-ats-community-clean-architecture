import { ReservationRepository } from "../../domain/reservation/reservation.repository";
import { ReservationValue } from "../../domain/reservation/reservation.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ReservationUseCase {
    constructor(
        private readonly reservationRepository: ReservationRepository,
    ) {
        this.getReservationsBySpace = this.getReservationsBySpace.bind(this);
        this.getReservationsByUser = this.getReservationsByUser.bind(this);
        this.getReservationsByCompany = this.getReservationsByCompany.bind(this);
        this.getDetailReservation = this.getDetailReservation.bind(this);
        this.createReservation = this.createReservation.bind(this);
        this.updateReservation = this.updateReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
    }

    public async getReservationsBySpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string) {
        try {
            const reservations = await this.reservationRepository.getReservationsBySpace(cmp_uuid, sit_uuid, spa_uuid);
            if (!reservations) {
                throw new Error('No hay reservas para este espacio.');
            }
            return reservations.map(res => ({
                cmp_uuid: res.cmp_uuid,
                sit_uuid: res.sit_uuid,
                res_uuid: res.res_uuid,
                spa_uuid: res.spa_uuid,
                usr_uuid: res.usr_uuid,
                res_date: res.res_date,
                res_slot: res.res_slot,
                res_status: res.res_status,
                space: res.space ? {
                    spa_uuid: res.space.spa_uuid,
                    spa_name: res.space.spa_name,
                    spa_type: res.space.spa_type
                } : undefined,
                usr: res.usr ? {
                    usr_uuid: res.usr.usr_uuid,
                    usr_name: res.usr.usr_name,
                    usr_surname: res.usr.usr_surname
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getReservationsBySpace (use case):', error.message);
            throw error;
        }
    }

    public async getReservationsByUser(cmp_uuid: string, usr_uuid: string) {
        try {
            const reservations = await this.reservationRepository.getReservationsByUser(cmp_uuid, usr_uuid);
            if (!reservations) {
                throw new Error('No hay reservas para este usuario.');
            }
            return reservations.map(res => ({
                cmp_uuid: res.cmp_uuid,
                sit_uuid: res.sit_uuid,
                res_uuid: res.res_uuid,
                spa_uuid: res.spa_uuid,
                usr_uuid: res.usr_uuid,
                res_date: res.res_date,
                res_slot: res.res_slot,
                res_status: res.res_status,
                space: res.space ? {
                    spa_uuid: res.space.spa_uuid,
                    spa_name: res.space.spa_name,
                    spa_type: res.space.spa_type
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getReservationsByUser (use case):', error.message);
            throw error;
        }
    }

    public async getReservationsByCompany(cmp_uuid: string) {
        try {
            const reservations = await this.reservationRepository.getReservationsByCompany(cmp_uuid);
            if (!reservations) {
                throw new Error('No hay reservas.');
            }
            return reservations.map(res => ({
                cmp_uuid: res.cmp_uuid,
                sit_uuid: res.sit_uuid,
                res_uuid: res.res_uuid,
                spa_uuid: res.spa_uuid,
                usr_uuid: res.usr_uuid,
                res_date: res.res_date,
                res_slot: res.res_slot,
                res_status: res.res_status,
                space: res.space ? {
                    spa_uuid: res.space.spa_uuid,
                    spa_name: res.space.spa_name,
                    spa_type: res.space.spa_type
                } : undefined,
                usr: res.usr ? {
                    usr_uuid: res.usr.usr_uuid,
                    usr_name: res.usr.usr_name,
                    usr_surname: res.usr.usr_surname
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getReservationsByCompany (use case):', error.message);
            throw error;
        }
    }

    public async getDetailReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string) {
        try {
            const res = await this.reservationRepository.findReservationById(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid);
            if (!res) {
                throw new Error(`No hay reserva con ID: ${res_uuid}`);
            }
            return {
                res_uuid: res.res_uuid,
                spa_uuid: res.spa_uuid,
                usr_uuid: res.usr_uuid,
                res_date: res.res_date,
                res_slot: res.res_slot,
                res_status: res.res_status,
                space: res.space ? {
                    spa_uuid: res.space.spa_uuid,
                    spa_name: res.space.spa_name,
                    spa_type: res.space.spa_type
                } : undefined,
                usr: res.usr ? {
                    usr_uuid: res.usr.usr_uuid,
                    usr_name: res.usr.usr_name,
                    usr_surname: res.usr.usr_surname
                } : undefined
            };
        } catch (error: any) {
            console.error('Error en getDetailReservation (use case):', error.message);
            throw error;
        }
    }

    public async createReservation({ cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_date, res_slot, res_status }: { cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_date: string | Date, res_slot: string, res_status?: 'Aprobada' | 'Pendiente' | 'Cancelada' }) {
        try {
            const isOverlapped = await this.reservationRepository.checkOverlap(cmp_uuid, sit_uuid, spa_uuid, res_date, res_slot);
            if (isOverlapped) {
                throw new Error('El bloque horario para este espacio ya está reservado.');
            }
            const resValue = new ReservationValue({ cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_date, res_slot, res_status });
            const resCreated = await this.reservationRepository.createReservation(resValue);
            if (!resCreated) {
                throw new Error('No se pudo crear la reserva.');
            }
            return {
                res_uuid: resCreated.res_uuid,
                spa_uuid: resCreated.spa_uuid,
                usr_uuid: resCreated.usr_uuid,
                res_date: resCreated.res_date,
                res_slot: resCreated.res_slot,
                res_status: resCreated.res_status,
            };
        } catch (error: any) {
            console.error('Error en createReservation (use case):', error.message);
            throw error;
        }
    }

    public async updateReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string, { res_status }: { res_status: 'Aprobada' | 'Pendiente' | 'Cancelada' }) {
        try {
            const resUpdated = await this.reservationRepository.updateReservation(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid, { res_status });
            if (!resUpdated) {
                throw new Error('No se pudo actualizar la reserva.');
            }
            return {
                res_uuid: resUpdated.res_uuid,
                spa_uuid: resUpdated.spa_uuid,
                usr_uuid: resUpdated.usr_uuid,
                res_date: resUpdated.res_date,
                res_slot: resUpdated.res_slot,
                res_status: resUpdated.res_status,
            };
        } catch (error: any) {
            console.error('Error en updateReservation (use case):', error.message);
            throw error;
        }
    }

    public async deleteReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string) {
        try {
            const resDeleted = await this.reservationRepository.deleteReservation(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid);
            if (!resDeleted) {
                throw new Error('No se pudo eliminar la reserva.');
            }
            return {
                res_uuid: resDeleted.res_uuid,
                spa_uuid: resDeleted.spa_uuid,
                usr_uuid: resDeleted.usr_uuid,
                res_date: resDeleted.res_date,
                res_slot: resDeleted.res_slot,
                res_status: resDeleted.res_status,
            };
        } catch (error: any) {
            console.error('Error en deleteReservation (use case):', error.message);
            throw error;
        }
    }
}
