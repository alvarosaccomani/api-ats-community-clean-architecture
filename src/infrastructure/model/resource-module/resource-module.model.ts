import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ResourceModuleEntity } from "../../../domain/resource-module/resource-module.entity";

export class SequelizeResourceModule extends Model<ResourceModuleEntity, Omit<ResourceModuleEntity, 'id'>> {
  declare remo_uuid: string;
  declare remo_name: string;
  declare remo_description: string;
  declare remo_createdat: Date;
  declare remo_updatedat: Date;
}

SequelizeResourceModule.init({
  remo_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  remo_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  remo_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  remo_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  remo_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'remo_createdat',
  updatedAt: 'remo_updatedat',
  tableName: 'remo_resourcesmodules'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeResourceModule.sync();
}