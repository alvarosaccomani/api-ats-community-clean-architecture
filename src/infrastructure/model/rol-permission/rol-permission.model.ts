import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { RolPermissionEntity } from "../../../domain/rol-permission/rol-permission.entity";
import { SequelizePermission } from '../permission/permission.model';
import { SequelizeRol } from '../rol/rol.model';

export class SequelizeRolPermission extends Model<RolPermissionEntity, Omit<RolPermissionEntity, 'id'>> {
  declare per_uuid: string;
  declare rol_uuid: string;
  declare rolper_createdat: Date;
  declare rolper_updatedat: Date;
}

SequelizeRolPermission.init({
  rol_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  per_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  rolper_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rolper_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'rolper_createdat',
  updatedAt: 'rolper_updatedat',
  tableName: 'rolper_rolespermissions'
});
SequelizeRolPermission.belongsTo(SequelizePermission, {
  as: 'per',
  foreignKey: 'per_uuid'
});
SequelizeRolPermission.belongsTo(SequelizeRol, {
  as: 'rol',
  foreignKey: 'rol_uuid'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeRolPermission.sync();
}