import { FeeEntity, FeeUpdateData } from "../../../domain/fee/fee.entity";
import { FeeRepository } from "../../../domain/fee/fee.repository";
import { SequelizeFee } from "../../model/fee/fee.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeUnit } from "../../model/unit/unit.model";

export class SequelizeRepository implements FeeRepository {
    async getFees(cmp_uuid: string, usr_uuid?: string, uni_uuid?: string, usruni_uuid?: string, filters?: any): Promise<FeeEntity[] | null> {
        try {
            const whereClause: any = { cmp_uuid };
            if (usr_uuid && usr_uuid !== 'null' && usr_uuid !== 'undefined' && usr_uuid !== '') {
                whereClause.usr_uuid = usr_uuid;
            }
            if (uni_uuid && uni_uuid !== 'null' && uni_uuid !== 'undefined' && uni_uuid !== '') {
                whereClause.uni_uuid = uni_uuid;
            }
            if (usruni_uuid && usruni_uuid !== 'null' && usruni_uuid !== 'undefined' && usruni_uuid !== '') {
                whereClause.usruni_uuid = usruni_uuid;
            }
            if (filters) {
                if (filters.fee_status) whereClause.fee_status = filters.fee_status;
                if (filters.fee_period) whereClause.fee_period = filters.fee_period;
            }

            const fees = await SequelizeFee.findAll({
                where: whereClause,
                include: [
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email']
                    },
                    {
                        model: SequelizeUnit,
                        as: 'unit',
                        attributes: ['uni_uuid', 'uni_code', 'uni_category']
                    }
                ],
                order: [['fee_duedate', 'DESC']]
            });
            return fees;
        } catch (error: any) {
            console.error('Error en getFees:', error.message);
            throw error;
        }
    }

    async findFeeById(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string): Promise<FeeEntity | null> {
        try {
            const fee = await SequelizeFee.findOne({
                where: {
                    cmp_uuid,
                    usr_uuid,
                    uni_uuid,
                    usruni_uuid,
                    fee_uuid
                }
            });
            return fee ? (fee.dataValues as FeeEntity) : null;
        } catch (error: any) {
            console.error('Error en findFeeById:', error.message);
            throw error;
        }
    }

    async createFee(fee: FeeEntity): Promise<FeeEntity | null> {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, fee_period, fee_amount, fee_duedate, fee_status, fee_createdat } = fee;
            const result = await SequelizeFee.create({
                cmp_uuid,
                usr_uuid,
                uni_uuid,
                usruni_uuid,
                fee_uuid,
                fee_period,
                fee_amount,
                fee_duedate,
                fee_status,
                fee_createdat
            });
            if (!result) {
                throw new Error('No se pudo registrar la expensa.');
            }
            return result.dataValues as FeeEntity;
        } catch (error: any) {
            console.error('Error en createFee:', error.message);
            throw error;
        }
    }

    async updateFee(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, fee: FeeUpdateData): Promise<FeeEntity | null> {
        try {
            const [updatedCount, [updatedFee]] = await SequelizeFee.update(
                {
                    fee_period: fee.fee_period,
                    fee_amount: fee.fee_amount,
                    fee_duedate: fee.fee_duedate,
                    fee_status: fee.fee_status
                },
                {
                    where: {
                        cmp_uuid,
                        usr_uuid,
                        uni_uuid,
                        usruni_uuid,
                        fee_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la expensa.');
            }
            return updatedFee.get({ plain: true }) as FeeEntity;
        } catch (error: any) {
            console.error('Error en updateFee:', error.message);
            throw error;
        }
    }

    async deleteFee(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string): Promise<FeeEntity | null> {
        try {
            const fee = await this.findFeeById(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid);
            if (!fee) {
                throw new Error(`No existe la expensa con ID: ${fee_uuid}`);
            }
            const result = await SequelizeFee.destroy({
                where: {
                    cmp_uuid,
                    usr_uuid,
                    uni_uuid,
                    usruni_uuid,
                    fee_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la expensa.');
            }
            return fee;
        } catch (error: any) {
            console.error('Error en deleteFee:', error.message);
            throw error;
        }
    }
}
