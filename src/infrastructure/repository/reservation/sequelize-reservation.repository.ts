import { ReservationEntity, ReservationUpdateData } from "../../../domain/reservation/reservation.entity";
import { ReservationRepository } from "../../../domain/reservation/reservation.repository";
import { SequelizeReservation } from "../../model/reservation/reservation.model";
import { SequelizeSpace } from "../../model/space/space.model";
import { SequelizeSite } from "../../model/site/site.model";
import { SequelizeUser } from "../../model/user/user.model";
import { Op } from "sequelize";

export class SequelizeReservationRepository implements ReservationRepository {
    async getReservationsBySpace(cmp_uuid: string, sit_uuid: string, spa_uuid: string): Promise<ReservationEntity[] | null> {
        try {
            const reservations = await SequelizeReservation.findAll({
                where: { cmp_uuid, sit_uuid, spa_uuid },
                include: [
                    {
                        model: SequelizeSpace,
                        as: 'space',
                        attributes: ['spa_uuid', 'spa_name', 'spa_type'],
                        include: [
                            {
                                model: SequelizeSite,
                                as: 'site',
                                attributes: ['sit_uuid', 'sit_name']
                            }
                        ]
                    },
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname']
                    }
                ],
                order: [['res_date', 'ASC'], ['res_slot', 'ASC']]
            });
            return reservations;
        } catch (error: any) {
            console.error('Error en getReservationsBySpace:', error.message);
            throw error;
        }
    }

    async getReservationsByUser(cmp_uuid: string, usr_uuid: string): Promise<ReservationEntity[] | null> {
        try {
            const reservations = await SequelizeReservation.findAll({
                where: { cmp_uuid, usr_uuid },
                include: [
                    {
                        model: SequelizeSpace,
                        as: 'space',
                        attributes: ['spa_uuid', 'spa_name', 'spa_type'],
                        include: [
                            {
                                model: SequelizeSite,
                                as: 'site',
                                attributes: ['sit_uuid', 'sit_name']
                            }
                        ]
                    }
                ],
                order: [['res_date', 'DESC']]
            });
            return reservations;
        } catch (error: any) {
            console.error('Error en getReservationsByUser:', error.message);
            throw error;
        }
    }

    async getReservationsByCompany(cmp_uuid: string): Promise<ReservationEntity[] | null> {
        try {
            const reservations = await SequelizeReservation.findAll({
                where: { cmp_uuid },
                include: [
                    {
                        model: SequelizeSpace,
                        as: 'space',
                        attributes: ['spa_uuid', 'spa_name', 'spa_type'],
                        include: [
                            {
                                model: SequelizeSite,
                                as: 'site',
                                attributes: ['sit_uuid', 'sit_name']
                            }
                        ]
                    },
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname']
                    }
                ],
                order: [['res_date', 'DESC']]
            });
            return reservations;
        } catch (error: any) {
            console.error('Error en getReservationsByCompany:', error.message);
            throw error;
        }
    }

    async findReservationById(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string): Promise<ReservationEntity | null> {
        try {
            const reservation = await SequelizeReservation.findOne({
                where: { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid },
                include: [
                    {
                        model: SequelizeSpace,
                        as: 'space',
                        attributes: ['spa_uuid', 'spa_name', 'spa_type']
                    },
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname']
                    }
                ]
            });
            return reservation ? (reservation.dataValues as ReservationEntity) : null;
        } catch (error: any) {
            console.error('Error en findReservationById:', error.message);
            throw error;
        }
    }

    async createReservation(reservation: ReservationEntity): Promise<ReservationEntity | null> {
        try {
            const { cmp_uuid, sit_uuid, spa_uuid, res_uuid, usr_uuid, res_date, res_slot, res_status } = reservation;
            const result = await SequelizeReservation.create({
                cmp_uuid,
                sit_uuid,
                spa_uuid,
                res_uuid,
                usr_uuid,
                res_date,
                res_slot,
                res_status
            });
            return result ? (result.dataValues as ReservationEntity) : null;
        } catch (error: any) {
            console.error('Error en createReservation:', error.message);
            throw error;
        }
    }

    async updateReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string, reservation: ReservationUpdateData): Promise<ReservationEntity | null> {
        try {
            const [updatedCount, [updatedRes]] = await SequelizeReservation.update(
                {
                    res_status: reservation.res_status
                },
                {
                    where: { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la reserva.');
            }
            return updatedRes.get({ plain: true }) as ReservationEntity;
        } catch (error: any) {
            console.error('Error en updateReservation:', error.message);
            throw error;
        }
    }

    async deleteReservation(cmp_uuid: string, sit_uuid: string, spa_uuid: string, usr_uuid: string, res_uuid: string): Promise<ReservationEntity | null> {
        try {
            const reservation = await this.findReservationById(cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid);
            if (!reservation) {
                throw new Error(`No existe la reserva con ID: ${res_uuid}`);
            }
            const result = await SequelizeReservation.destroy({
                where: { cmp_uuid, sit_uuid, spa_uuid, usr_uuid, res_uuid }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la reserva.');
            }
            return reservation;
        } catch (error: any) {
            console.error('Error en deleteReservation:', error.message);
            throw error;
        }
    }

    async checkOverlap(cmp_uuid: string, sit_uuid: string, spa_uuid: string, res_date: string | Date, res_slot: string): Promise<boolean> {
        try {
            const dateStr = typeof res_date === 'string' ? res_date : res_date.toISOString().split('T')[0];
            const existing = await SequelizeReservation.findOne({
                where: {
                    cmp_uuid,
                    sit_uuid,
                    spa_uuid,
                    res_date: dateStr,
                    res_slot,
                    res_status: {
                        [Op.ne]: 'Cancelada'
                    }
                }
            });
            return existing !== null;
        } catch (error: any) {
            console.error('Error en checkOverlap:', error.message);
            throw error;
        }
    }
}
