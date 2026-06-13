import { UserUnitEntity, UserUnitUpdateData } from "../../../domain/user-unit/user-unit.entity";
import { UserUnitRepository } from "../../../domain/user-unit/user-unit.repository";
import { SequelizeUserUnit } from "../../model/user-unit/user-unit.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeUnit } from "../../model/unit/unit.model";

export class SequelizeRepository implements UserUnitRepository {
    async getUsersUnits(cmp_uuid: string, usr_uuid: string): Promise<UserUnitEntity[] | null> {
        try {
            const userUnits = await SequelizeUserUnit.findAll({
                where: {
                    cmp_uuid,
                    usr_uuid
                },
                include: [
                    {
                        model: SequelizeUnit,
                        as: 'unit'
                    }
                ]
            });
            return userUnits as unknown as UserUnitEntity[];
        } catch (error: any) {
            console.error('Error en getUsersUnits:', error.message);
            throw error;
        }
    }

    async getUnitUsers(cmp_uuid: string, uni_uuid: string): Promise<UserUnitEntity[] | null> {
        try {
            const userUnits = await SequelizeUserUnit.findAll({
                where: {
                    cmp_uuid,
                    uni_uuid
                },
                include: [
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_nick', 'usr_email']
                    }
                ]
            });
            return userUnits as unknown as UserUnitEntity[];
        } catch (error: any) {
            console.error('Error en getUnitUsers:', error.message);
            throw error;
        }
    }

    async findUserUnitById(cmp_uuid: string, usr_uuid: string, uni_uuid: string): Promise<UserUnitEntity | null> {
        try {
            const userUnit = await SequelizeUserUnit.findOne({
                where: {
                    cmp_uuid,
                    usr_uuid,
                    uni_uuid
                }
            });
            return userUnit ? (userUnit.dataValues as UserUnitEntity) : null;
        } catch (error: any) {
            console.error('Error en findUserUnitById:', error.message);
            throw error;
        }
    }

    async createUserUnit(userUnit: UserUnitEntity): Promise<UserUnitEntity | null> {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, usruni_relationtype, usruni_isactive, usruni_startdate, usruni_enddate, usruni_createdat, usruni_updatedat } = userUnit;
            const result = await SequelizeUserUnit.create({
                cmp_uuid,
                usr_uuid,
                uni_uuid,
                usruni_uuid,
                usruni_relationtype,
                usruni_isactive,
                usruni_startdate,
                usruni_enddate,
                usruni_createdat,
                usruni_updatedat
            });
            if (!result) {
                throw new Error('No se pudo registrar la asignación de unidad.');
            }
            return result.dataValues as UserUnitEntity;
        } catch (error: any) {
            console.error('Error en createUserUnit:', error.message);
            throw error;
        }
    }

    async updateUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string, userUnit: UserUnitUpdateData): Promise<UserUnitEntity | null> {
        try {
            const [updatedCount, [updatedUserUnit]] = await SequelizeUserUnit.update(
                {
                    usruni_relationtype: userUnit.usruni_relationtype,
                    usruni_isactive: userUnit.usruni_isactive,
                    usruni_startdate: userUnit.usruni_startdate,
                    usruni_enddate: userUnit.usruni_enddate
                },
                {
                    where: {
                        cmp_uuid,
                        usr_uuid,
                        uni_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la asignación de unidad.');
            }
            return updatedUserUnit.get({ plain: true }) as UserUnitEntity;
        } catch (error: any) {
            console.error('Error en updateUserUnit:', error.message);
            throw error;
        }
    }

    async deleteUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string): Promise<UserUnitEntity | null> {
        try {
            const userUnit = await this.findUserUnitById(cmp_uuid, usr_uuid, uni_uuid);
            if (!userUnit) {
                throw new Error(`No existe la asignación de unidad para el usuario: ${usr_uuid} en la unidad: ${uni_uuid}`);
            }
            const result = await SequelizeUserUnit.destroy({
                where: {
                    cmp_uuid,
                    usr_uuid,
                    uni_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la asignación de unidad.');
            }
            return userUnit;
        } catch (error: any) {
            console.error('Error en deleteUserUnit:', error.message);
            throw error;
        }
    }
}
