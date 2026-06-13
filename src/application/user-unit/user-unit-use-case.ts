import { UserUnitRepository } from "../../domain/user-unit/user-unit.repository";
import { UserUnitValue } from "../../domain/user-unit/user-unit.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class UserUnitUseCase {
    constructor(
        private readonly userUnitRepository: UserUnitRepository,
    ) {
        this.getUsersUnits = this.getUsersUnits.bind(this);
        this.getUnitUsers = this.getUnitUsers.bind(this);
        this.getDetailUserUnit = this.getDetailUserUnit.bind(this);
        this.createUserUnit = this.createUserUnit.bind(this);
        this.updateUserUnit = this.updateUserUnit.bind(this);
        this.deleteUserUnit = this.deleteUserUnit.bind(this);
    }

    public async getUsersUnits(cmp_uuid: string, usr_uuid: string) {
        try {
            const userUnits = await this.userUnitRepository.getUsersUnits(cmp_uuid, usr_uuid);
            if (!userUnits) {
                throw new Error('No hay asignaciones de unidades.');
            }
            return userUnits.map(userUnit => ({
                cmp_uuid: userUnit.cmp_uuid,
                usr_uuid: userUnit.usr_uuid,
                uni_uuid: userUnit.uni_uuid,
                usruni_uuid: userUnit.usruni_uuid,
                usruni_relationtype: userUnit.usruni_relationtype,
                usruni_isactive: userUnit.usruni_isactive,
                usruni_startdate: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_startdate, 'America/Buenos_Aires'),
                usruni_enddate: userUnit.usruni_enddate ? TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_enddate, 'America/Buenos_Aires') : null,
                usruni_createdat: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_createdat, 'America/Buenos_Aires'),
                usruni_updatedat: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_updatedat, 'America/Buenos_Aires'),
                unit: userUnit.unit ? {
                    cmp_uuid: userUnit.unit.cmp_uuid,
                    uni_uuid: userUnit.unit.uni_uuid,
                    uni_code: userUnit.unit.uni_code,
                    uni_category: userUnit.unit.uni_category,
                    uni_status: userUnit.unit.uni_status,
                    uni_financialcoefficient: userUnit.unit.uni_financialcoefficient,
                    uni_baseamountcustom: userUnit.unit.uni_baseamountcustom,
                    uni_locationdetails: userUnit.unit.uni_locationdetails,
                    uni_istransferable: userUnit.unit.uni_istransferable,
                    uni_createdat: userUnit.unit.uni_createdat,
                    uni_updatedat: userUnit.unit.uni_updatedat
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getUsersUnits (use case):', error.message);
            throw error;
        }
    }

    public async getUnitUsers(cmp_uuid: string, uni_uuid: string) {
        try {
            const userUnits = await this.userUnitRepository.getUnitUsers(cmp_uuid, uni_uuid);
            if (!userUnits) {
                throw new Error('No hay habitantes asignados a esta unidad.');
            }
            return userUnits.map(userUnit => ({
                cmp_uuid: userUnit.cmp_uuid,
                usr_uuid: userUnit.usr_uuid,
                uni_uuid: userUnit.uni_uuid,
                usruni_uuid: userUnit.usruni_uuid,
                usruni_relationtype: userUnit.usruni_relationtype,
                usruni_isactive: userUnit.usruni_isactive,
                usruni_startdate: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_startdate, 'America/Buenos_Aires'),
                usruni_enddate: userUnit.usruni_enddate ? TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_enddate, 'America/Buenos_Aires') : null,
                usruni_createdat: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_createdat, 'America/Buenos_Aires'),
                usruni_updatedat: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_updatedat, 'America/Buenos_Aires'),
                usr: userUnit.usr ? {
                    usr_uuid: userUnit.usr.usr_uuid,
                    usr_name: userUnit.usr.usr_name,
                    usr_surname: userUnit.usr.usr_surname,
                    usr_nick: userUnit.usr.usr_nick,
                    usr_email: userUnit.usr.usr_email
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getUnitUsers (use case):', error.message);
            throw error;
        }
    }

    public async getDetailUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string) {
        try {
            const userUnit = await this.userUnitRepository.findUserUnitById(cmp_uuid, usr_uuid, uni_uuid);
            if (!userUnit) {
                throw new Error(`No hay asignación de unidad para el usuario: ${usr_uuid} en la unidad: ${uni_uuid}`);
            }
            return {
                cmp_uuid: userUnit.cmp_uuid,
                usr_uuid: userUnit.usr_uuid,
                uni_uuid: userUnit.uni_uuid,
                usruni_uuid: userUnit.usruni_uuid,
                usruni_relationtype: userUnit.usruni_relationtype,
                usruni_isactive: userUnit.usruni_isactive,
                usruni_startdate: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_startdate, 'America/Buenos_Aires'),
                usruni_enddate: userUnit.usruni_enddate ? TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_enddate, 'America/Buenos_Aires') : null,
                usruni_createdat: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_createdat, 'America/Buenos_Aires'),
                usruni_updatedat: TimezoneConverter.toIsoStringInTimezone(userUnit.usruni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailUserUnit (use case):', error.message);
            throw error;
        }
    }

    public async createUserUnit(body: any) {
        try {
            const userUnitValue = new UserUnitValue(body);
            const userUnitCreated = await this.userUnitRepository.createUserUnit(userUnitValue);
            if (!userUnitCreated) {
                throw new Error('No se pudo registrar la asignación de unidad.');
            }
            return {
                cmp_uuid: userUnitCreated.cmp_uuid,
                usr_uuid: userUnitCreated.usr_uuid,
                uni_uuid: userUnitCreated.uni_uuid,
                usruni_uuid: userUnitCreated.usruni_uuid,
                usruni_relationtype: userUnitCreated.usruni_relationtype,
                usruni_isactive: userUnitCreated.usruni_isactive,
                usruni_startdate: TimezoneConverter.toIsoStringInTimezone(userUnitCreated.usruni_startdate, 'America/Buenos_Aires'),
                usruni_enddate: userUnitCreated.usruni_enddate ? TimezoneConverter.toIsoStringInTimezone(userUnitCreated.usruni_enddate, 'America/Buenos_Aires') : null,
                usruni_createdat: TimezoneConverter.toIsoStringInTimezone(userUnitCreated.usruni_createdat, 'America/Buenos_Aires'),
                usruni_updatedat: TimezoneConverter.toIsoStringInTimezone(userUnitCreated.usruni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createUserUnit (use case):', error.message);
            throw error;
        }
    }

    public async updateUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string, body: any) {
        try {
            const userUnitUpdated = await this.userUnitRepository.updateUserUnit(cmp_uuid, usr_uuid, uni_uuid, body);
            if (!userUnitUpdated) {
                throw new Error('No se pudo actualizar la asignación de unidad.');
            }
            return {
                cmp_uuid: userUnitUpdated.cmp_uuid,
                usr_uuid: userUnitUpdated.usr_uuid,
                uni_uuid: userUnitUpdated.uni_uuid,
                usruni_uuid: userUnitUpdated.usruni_uuid,
                usruni_relationtype: userUnitUpdated.usruni_relationtype,
                usruni_isactive: userUnitUpdated.usruni_isactive,
                usruni_startdate: TimezoneConverter.toIsoStringInTimezone(userUnitUpdated.usruni_startdate, 'America/Buenos_Aires'),
                usruni_enddate: userUnitUpdated.usruni_enddate ? TimezoneConverter.toIsoStringInTimezone(userUnitUpdated.usruni_enddate, 'America/Buenos_Aires') : null,
                usruni_createdat: TimezoneConverter.toIsoStringInTimezone(userUnitUpdated.usruni_createdat, 'America/Buenos_Aires'),
                usruni_updatedat: TimezoneConverter.toIsoStringInTimezone(userUnitUpdated.usruni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateUserUnit (use case):', error.message);
            throw error;
        }
    }

    public async deleteUserUnit(cmp_uuid: string, usr_uuid: string, uni_uuid: string) {
        try {
            const userUnitDeleted = await this.userUnitRepository.deleteUserUnit(cmp_uuid, usr_uuid, uni_uuid);
            if (!userUnitDeleted) {
                throw new Error('No se pudo eliminar la asignación de unidad.');
            }
            return {
                cmp_uuid: userUnitDeleted.cmp_uuid,
                usr_uuid: userUnitDeleted.usr_uuid,
                uni_uuid: userUnitDeleted.uni_uuid,
                usruni_uuid: userUnitDeleted.usruni_uuid,
                usruni_relationtype: userUnitDeleted.usruni_relationtype,
                usruni_isactive: userUnitDeleted.usruni_isactive,
                usruni_startdate: TimezoneConverter.toIsoStringInTimezone(userUnitDeleted.usruni_startdate, 'America/Buenos_Aires'),
                usruni_enddate: userUnitDeleted.usruni_enddate ? TimezoneConverter.toIsoStringInTimezone(userUnitDeleted.usruni_enddate, 'America/Buenos_Aires') : null,
                usruni_createdat: TimezoneConverter.toIsoStringInTimezone(userUnitDeleted.usruni_createdat, 'America/Buenos_Aires'),
                usruni_updatedat: TimezoneConverter.toIsoStringInTimezone(userUnitDeleted.usruni_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteUserUnit (use case):', error.message);
            throw error;
        }
    }
}
