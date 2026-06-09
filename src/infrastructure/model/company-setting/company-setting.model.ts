import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanySettingEntity } from "../../../domain/company-setting/company-setting.entity";

export class SequelizeCompanySetting extends Model<CompanySettingEntity, Omit<CompanySettingEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cmps_uuid: string;
  declare cmps_key: string;
  declare cmps_parameter: string;
  declare cmps_description: string;
  declare cmps_value: string;
  declare cmps_datatype: string;
  declare cmps_options: string;
  declare cmps_group: string;
  declare cmps_createdat: Date;
  declare cmps_updatedat: Date
}

SequelizeCompanySetting.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cmps_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cmps_key: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_parameter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_value: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_datatype: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_options: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_group: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmps_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cmps_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmps_createdat', 
  updatedAt: 'cmps_updatedat',
  tableName: 'cmps_companiessettings'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCompanySetting.sync();
}