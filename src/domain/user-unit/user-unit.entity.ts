import { UnitEntity } from "../unit/unit.entity";

export interface UserUnitEntity {
    cmp_uuid: string;
    usr_uuid: string;
    uni_uuid: string;
    usruni_uuid: string;
    usruni_relationtype: 'Propietario' | 'Copropietario' | 'Inquilino' | 'Socio Principal';
    usruni_isactive: boolean;
    usruni_startdate: Date;
    usruni_enddate: Date;
    usruni_createdat: Date;
    usruni_updatedat: Date;
    usr?: {
        usr_uuid: string;
        usr_name: string;
        usr_surname: string;
        usr_nick: string;
        usr_email: string;
    };
    unit?: UnitEntity;
}

//Update
export type UserUnitUpdateData = Pick<UserUnitEntity, 'usruni_relationtype' | 'usruni_isactive' | 'usruni_startdate' | 'usruni_enddate'>;