export interface UnitEntity {
    cmp_uuid: string;
    uni_uuid: string;
    uni_code: string;
    uni_category: 'Residencial' | 'Comercial' | 'Socio Pleno' | 'Socio Deportivo' | 'Espacio Comun' | 'Parcela';
    uni_status: 'Activo' | 'Inactivo' | 'En_Mantenimiento';
    uni_financialcoefficient: number;
    uni_baseamountcustom: number;
    uni_locationdetails: string;
    uni_metadata?: Record<string, any>; // Campo dinámico para la flexibilidad genérica
    uni_istransferable: boolean;
    sit_uuid?: string | null;
    spa_uuid?: string | null;
    uni_createdat: Date;
    uni_updatedat: Date
}

//Update
export type UnitUpdateData = Pick<UnitEntity, 'uni_code' | 'uni_category' | 'uni_status' | 'uni_financialcoefficient' | 'uni_baseamountcustom' | 'uni_locationdetails' | 'uni_metadata' | 'uni_istransferable' | 'sit_uuid' | 'spa_uuid'>;