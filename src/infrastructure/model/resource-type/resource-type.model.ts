import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ResourceTypeEntity } from "../../../domain/resource-type/resource-type.entity";

export class SequelizeResourceType extends Model<ResourceTypeEntity, Omit<ResourceTypeEntity, 'id'>> {
  declare rety_uuid: string;
  declare rety_name: string;
  declare rety_description: string;
  declare rety_createdat: Date;
  declare rety_updatedat: Date;
}

SequelizeResourceType.init({
  rety_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  rety_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rety_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rety_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rety_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'rety_createdat',
  updatedAt: 'rety_updatedat',
  tableName: 'rety_resourcestypes'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeResourceType.sync();
}