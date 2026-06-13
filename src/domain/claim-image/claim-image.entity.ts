export interface ClaimImageEntity {
    cmp_uuid: string;
    cla_uuid: string;
    claimg_uuid: string;
    claimg_image: string;
    claimg_moment: 'Antes' | 'Despues';
    claimg_createdat: Date;
    claimg_updatedat: Date
}

//Update
export type ClaimImageUpdateData = Pick<ClaimImageEntity, 'claimg_image' | 'claimg_moment'>;