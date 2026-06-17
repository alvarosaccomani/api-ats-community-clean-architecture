import { v4 as uuid } from "uuid";
import moment from 'moment';
import { SpaceEntity } from "./space.entity";

export class SpaceValue implements SpaceEntity {
  cmp_uuid: string;
  sit_uuid: string;
  spa_uuid: string;
  spa_code: string;
  spa_name: string;
  spa_type: 'Reservable' | 'General';
  spa_capacity: number | null;
  spa_cost: number | null;
  spa_status: 'Active' | 'Maintenance' | 'Inactive';
  spa_createdat: Date;
  spa_updatedat: Date;

  constructor({
    cmp_uuid,
    sit_uuid,
    spa_uuid,
    spa_code,
    spa_name,
    spa_type,
    spa_capacity,
    spa_cost,
    spa_status,
    spa_createdat,
    spa_updatedat
  }: {
    cmp_uuid: string;
    sit_uuid: string;
    spa_uuid?: string;
    spa_code: string;
    spa_name: string;
    spa_type: 'Reservable' | 'General';
    spa_capacity?: number | null;
    spa_cost?: number | null;
    spa_status?: 'Active' | 'Maintenance' | 'Inactive';
    spa_createdat?: Date;
    spa_updatedat?: Date;
  }) {
    this.cmp_uuid = cmp_uuid;
    this.sit_uuid = sit_uuid;
    this.spa_uuid = spa_uuid ?? uuid();
    this.spa_code = spa_code;
    this.spa_name = spa_name;
    this.spa_type = spa_type;
    this.spa_capacity = spa_capacity ?? null;
    this.spa_cost = spa_cost ?? null;
    this.spa_status = spa_status ?? 'Active';
    this.spa_createdat = spa_createdat ?? moment().toDate();
    this.spa_updatedat = spa_updatedat ?? moment().toDate();
  }
}