export interface SiteEntity {
  cmp_uuid: string;
  sit_uuid: string;
  sit_name: string;
  sit_address: string;
  sit_status: 'Activo' | 'Inactivo';
  sit_createdat?: Date;
  sit_updatedat?: Date;
}

export type SiteUpdateData = Pick<SiteEntity, 'sit_name' | 'sit_address' | 'sit_status'>;