import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CompanyEntity } from "../../../domain/company/company.entity";
import { SequelizeCompanySetting } from '../company-setting/company-setting.model';

export class SequelizeCompany extends Model<CompanyEntity, Omit<CompanyEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cmp_name: string;
  declare cmp_address: string;
  declare cmp_lat: number;
  declare cmp_lng: number;
  declare cmp_phone: string;
  declare cmp_email: string;
  declare cmp_slug: string;
  declare cmp_logo: string;
  declare cmp_banner: string;
  declare cmp_description: string;
  declare cmp_currency: string;
  declare cmp_whatsapp: string;
  declare cmp_instagram: string;
  declare cmp_facebook: string;
  declare cmp_allowbackorders: boolean;
  declare cmp_primarycolor: string;
  declare cmp_isfeatured: boolean;
  declare cmp_status: string;  //-- active, inactive, pending
  declare cmp_createdat: Date;
  declare cmp_updatedat: Date;
}

SequelizeCompany.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cmp_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cmp_lng: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cmp_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_banner: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_currency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_whatsapp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_instagram: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_facebook: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_allowbackorders: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  cmp_primarycolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_isfeatured: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  cmp_status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cmp_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cmp_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cmp_createdat', 
  updatedAt: 'cmp_updatedat',
  tableName: 'cmp_companies'
});

SequelizeCompany.hasMany(SequelizeCompanySetting, {
    foreignKey: 'cmp_uuid',
    sourceKey: 'cmp_uuid',
    as: 'companySettings'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCompany.sync();
}