export interface SpaceEntity {
    cmp_uuid: string;
    sit_uuid: string;
    spa_uuid: string;
    spa_code: string;
    spa_name: string;
    spa_type: 'Reservable' | 'General';
    spa_capacity?: number | null;
    spa_cost?: number | null;
    spa_status: 'Active' | 'Maintenance' | 'Inactive';
    spa_createdat?: Date;
    spa_updatedat?: Date;
    site?: {
        sit_uuid: string;
        sit_name: string;
    };
}

export type SpaceUpdateData = Pick<SpaceEntity, 'spa_code' | 'spa_name' | 'spa_type' | 'spa_capacity' | 'spa_cost' | 'spa_status'>;