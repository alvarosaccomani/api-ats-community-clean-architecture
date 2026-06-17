import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { SpaceEntity } from "../../../domain/space/space.entity";
import { SequelizeSite } from '../site/site.model';

export class SequelizeSpace extends Model<SpaceEntity, Omit<SpaceEntity, 'id'>> {
  declare cmp_uuid: string;
  declare sit_uuid: string;
  declare spa_uuid: string;
  declare spa_code: string;
  declare spa_name: string;
  declare spa_type: 'Reservable' | 'General';
  declare spa_capacity: number | null;
  declare spa_cost: number | null;
  declare spa_status: 'Active' | 'Maintenance' | 'Inactive';
}

SequelizeSpace.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  sit_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  spa_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  spa_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  spa_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  spa_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  spa_capacity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  spa_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  spa_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Active'
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'spa_createdat',
  updatedAt: 'spa_updatedat',
  tableName: 'spa_spaces'
});

SequelizeSpace.belongsTo(SequelizeSite, {
  as: 'site',
  foreignKey: 'sit_uuid'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeSpace.sync();
}
