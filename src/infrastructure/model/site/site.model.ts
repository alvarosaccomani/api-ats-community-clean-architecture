import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { SiteEntity } from "../../../domain/site/site.entity";
import { SequelizeCompany } from '../company/company.model';

export class SequelizeSite extends Model<SiteEntity, Omit<SiteEntity, 'id'>> {
  declare sit_uuid: string;
  declare cmp_uuid: string;
  declare sit_name: string;
  declare sit_address: string;
  declare sit_status: 'Activo' | 'Inactivo';
}

SequelizeSite.init({
  sit_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sit_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sit_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sit_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Activo'
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'sit_createdat',
  updatedAt: 'sit_updatedat',
  tableName: 'sit_sites'
});

SequelizeSite.belongsTo(SequelizeCompany, {
  as: 'company',
  foreignKey: 'cmp_uuid'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeSite.sync();
}
