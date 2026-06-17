import { v4 as uuid } from "uuid";
import moment from 'moment';
import { SiteEntity } from "./site.entity";

export class SiteValue implements SiteEntity {
  sit_uuid: string;
  cmp_uuid: string;
  sit_name: string;
  sit_address: string;
  sit_status: 'Activo' | 'Inactivo';
  sit_createdat: Date;
  sit_updatedat: Date;

  constructor({
    cmp_uuid,
    sit_uuid,
    sit_name,
    sit_address,
    sit_status,
    sit_createdat,
    sit_updatedat
  }: {
    cmp_uuid: string;
    sit_uuid?: string;
    sit_name: string;
    sit_address: string;
    sit_status?: 'Activo' | 'Inactivo';
    sit_createdat?: Date;
    sit_updatedat?: Date;
  }) {
    this.cmp_uuid = cmp_uuid;
    this.sit_uuid = sit_uuid ?? uuid();
    this.sit_name = sit_name;
    this.sit_address = sit_address;
    this.sit_status = sit_status ?? 'Activo';
    this.sit_createdat = sit_createdat ?? moment().toDate();
    this.sit_updatedat = sit_updatedat ?? moment().toDate();
  }
}