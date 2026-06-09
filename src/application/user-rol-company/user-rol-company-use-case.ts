import { UserRolCompanyRepository } from "../../domain/user-rol-company/user-rol-company.repository";
import { UserRolCompanyValue } from "../../domain/user-rol-company/user-rol-company.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class UserRolCompanyUseCase {
    constructor(
        private readonly userRolCompanyRepository: UserRolCompanyRepository
    ) {
        this.getUserRolesCompany = this.getUserRolesCompany.bind(this);
        this.getDetailUserRolCompany = this.getDetailUserRolCompany.bind(this);
        this.createUserRolCompany = this.createUserRolCompany.bind(this);
        this.updateUserRolCompany = this.updateUserRolCompany.bind(this);
        this.deleteUserRolCompany = this.deleteUserRolCompany.bind(this);
        this.getUserRolesCompanyByUser = this.getUserRolesCompanyByUser.bind(this);
    }

    public async getUserRolesCompany(cmp_uuid: string) {
        try {
            const userRolesCompany = await this.userRolCompanyRepository.getUserRolesCompany(cmp_uuid);
            if(!userRolesCompany) {
                throw new Error('No hay users roles companies.');
            }
            return userRolesCompany.map((userRolCompany) => ({
                cmp_uuid: userRolCompany.cmp_uuid,
                usr_uuid: userRolCompany.usr_uuid,
                usr: userRolCompany.usr,
                rol_uuid: userRolCompany.rol_uuid,
                rol: userRolCompany.rol,
                usrrolcmp_createdat: TimezoneConverter.toIsoStringInTimezone(userRolCompany.usrrolcmp_createdat, 'America/Argentina/Buenos_Aires'),
                usrrolcmp_updatedat: TimezoneConverter.toIsoStringInTimezone(userRolCompany.usrrolcmp_updatedat, 'America/Argentina/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getUserRoleCompanies (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string) {
        try {
            const userRolCompany = await this.userRolCompanyRepository.findUserRolCompanyById(cmp_uuid, usr_uuid, rol_uuid);
            if(!userRolCompany) {
                throw new Error(`No hay user rol company con el Id: ${cmp_uuid}, ${usr_uuid}, ${rol_uuid}`);
            }
            return {
                cmp_uuid: userRolCompany.cmp_uuid,
                usr_uuid: userRolCompany.usr_uuid,
                usr: userRolCompany.usr,
                rol_uuid: userRolCompany.rol_uuid,
                usrrolcmp_createdat: TimezoneConverter.toIsoStringInTimezone(userRolCompany.usrrolcmp_createdat, 'America/Argentina/Buenos_Aires'),
                usrrolcmp_updatedat: TimezoneConverter.toIsoStringInTimezone(userRolCompany.usrrolcmp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailUserRolCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createUserRolCompany({ cmp_uuid, usr_uuid, rol_uuid, usrrolcmp_createdat, usrrolcmp_updatedat } : { cmp_uuid: string, usr_uuid: string, rol_uuid: string, usrrolcmp_createdat: Date, usrrolcmp_updatedat: Date }) {
        try {
            const userRolCompanyValue = new UserRolCompanyValue({ cmp_uuid, usr_uuid, rol_uuid, usrrolcmp_createdat, usrrolcmp_updatedat });
            const userRolCompanyCreated = await this.userRolCompanyRepository.createUserRolCompany(userRolCompanyValue);
            if(!userRolCompanyCreated) {
                throw new Error(`No se pudo insertar el user rol company.`);
            }
            return {
                cmp_uuid: userRolCompanyCreated.cmp_uuid,
                usr_uuid: userRolCompanyCreated.usr_uuid,
                usr: userRolCompanyCreated.usr,
                rol_uuid: userRolCompanyCreated.rol_uuid,
                usrrolcmp_createdat: TimezoneConverter.toIsoStringInTimezone(userRolCompanyCreated.usrrolcmp_createdat, 'America/Argentina/Buenos_Aires'),
                usrrolcmp_updatedat: TimezoneConverter.toIsoStringInTimezone(userRolCompanyCreated.usrrolcmp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createUserRolCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string,{ usrrolcmp_createdat, usrrolcmp_updatedat } : { cmp_uuid: string, usr_uuid: string, rol_uuid: string, usrrolcmp_createdat: Date, usrrolcmp_updatedat: Date }) {
        try {
            const userRolCompanyUpdated = await this.userRolCompanyRepository.updateUserRolCompany(cmp_uuid, usr_uuid, rol_uuid, { cmp_uuid, usr_uuid, rol_uuid, usrrolcmp_createdat, usrrolcmp_updatedat });
            if(!userRolCompanyUpdated) {
                throw new Error(`No se pudo actualizar el user rol company.`);
            }
            return {
                cmp_uuid: userRolCompanyUpdated.cmp_uuid,
                usr_uuid: userRolCompanyUpdated.usr_uuid,
                usr: userRolCompanyUpdated.usr,
                rol_uuid: userRolCompanyUpdated.rol_uuid,
                usrrolcmp_createdat: TimezoneConverter.toIsoStringInTimezone(userRolCompanyUpdated.usrrolcmp_createdat, 'America/Argentina/Buenos_Aires'),
                usrrolcmp_updatedat: TimezoneConverter.toIsoStringInTimezone(userRolCompanyUpdated.usrrolcmp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateUserRolCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string) {
        try {
            const userRolCompanyDeleted = await this.userRolCompanyRepository.deleteUserRolCompany(cmp_uuid, usr_uuid, rol_uuid);
            if(!userRolCompanyDeleted) {
                throw new Error(`No se pudo eliminar el user rol company.`);
            }
            return {
                cmp_uuid: userRolCompanyDeleted.cmp_uuid,
                usr_uuid: userRolCompanyDeleted.usr_uuid,
                usr: userRolCompanyDeleted.usr,
                rol_uuid: userRolCompanyDeleted.rol_uuid,
                usrrolcmp_createdat: TimezoneConverter.toIsoStringInTimezone(userRolCompanyDeleted.usrrolcmp_createdat, 'America/Argentina/Buenos_Aires'),
                usrrolcmp_updatedat: TimezoneConverter.toIsoStringInTimezone(userRolCompanyDeleted.usrrolcmp_updatedat, 'America/Argentina/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteUserRolCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async existUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string) {
        try {
            const userRolCompany = this.userRolCompanyRepository.existUserRolCompany(cmp_uuid, usr_uuid, rol_uuid);
            return userRolCompany;
        } catch (error: any) {
            console.error('Error en existUserRolCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getUserRolesCompanyByUser(usr_uuid: string) {
        try {
            const userRolesCompany = this.userRolCompanyRepository.getUserRolesCompanyByUser(usr_uuid);
            return userRolesCompany;
        } catch (error: any) {
            console.error('Error en getUserRolesCompanyByUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getUserRolesCompanyByCompanyUser(cmp_uuid: string, usr_uuid: string) {
        try {
            const userRolesCompany = this.userRolCompanyRepository.getUserRolesCompanyByCompanyUser(cmp_uuid, usr_uuid);
            return userRolesCompany;
        } catch (error: any) {
            console.error('Error en getUserRolesCompanyByCompanyUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}