import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { UserUnitEntity } from "../../../domain/user-unit/user-unit.entity";
import { SequelizeUser } from '../user/user.model';
import { SequelizeUnit } from '../unit/unit.model';

export class SequelizeUserUnit extends Model<UserUnitEntity, Omit<UserUnitEntity, 'id'>> {
  declare cmp_uuid: string;
  declare usr_uuid: string;
  declare uni_uuid: string;
  declare usruni_uuid: string;
  declare usruni_relationtype: 'Propietario' | 'Copropietario' | 'Inquilino' | 'Socio Principal';
  declare usruni_isactive: boolean;
  declare usruni_startdate: Date;
  declare usruni_enddate: Date;
  declare usruni_createdat: Date;
  declare usruni_updatedat: Date;
}

SequelizeUserUnit.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uni_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usruni_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usruni_relationtype: {
    type: DataTypes.STRING, // 'Propietario' | 'Copropietario' | 'Inquilino' | 'Socio Principal'
    allowNull: false
  },
  usruni_isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  usruni_startdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usruni_enddate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  usruni_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  usruni_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'usruni_createdat',
  updatedAt: 'usruni_updatedat',
  tableName: 'usruni_usersunits'
});

SequelizeUserUnit.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});
SequelizeUserUnit.belongsTo(SequelizeUnit, {
  as: 'unit',
  foreignKey: 'uni_uuid'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeUserUnit.sync();
}
