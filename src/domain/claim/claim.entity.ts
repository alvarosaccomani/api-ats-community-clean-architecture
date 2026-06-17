export interface ClaimEntity {
    cmp_uuid: string;
    cla_uuid: string;
    usr_uuid: string;
    uni_uuid?: string | null;
    sit_uuid?: string | null;
    spa_uuid?: string | null;
    cla_title: string;
    cla_description: string;
    cla_type: 'Reclamo' | 'Sugerencia' | 'Propuesta';
    cla_status: 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado';
    cla_priority: 'Baja' | 'Media' | 'Alta';
    cla_createdat: Date;
    cla_updatedat: Date;
    usr?: {
        usr_uuid: string;
        usr_name: string;
        usr_surname: string;
        usr_email: string;
    };
    unit?: {
        uni_uuid: string;
        uni_code: string;
        uni_category: string;
    } | null;
    site?: {
        sit_uuid: string;
        sit_name: string;
    } | null;
    space?: {
        spa_uuid: string;
        spa_name: string;
        spa_type: string;
    } | null;
}

//Update
export type ClaimUpdateData = Pick<ClaimEntity, 'usr_uuid' | 'uni_uuid' | 'sit_uuid' | 'spa_uuid' | 'cla_title' | 'cla_description' | 'cla_type' | 'cla_status' | 'cla_priority'>;