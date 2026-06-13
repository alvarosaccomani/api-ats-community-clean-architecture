import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { FeeEntity } from "../../../domain/fee/fee.entity";

import { SequelizeUser } from '../user/user.model';
import { SequelizeUnit } from '../unit/unit.model';

export class SequelizeFee extends Model<FeeEntity, Omit<FeeEntity, 'id'>> {
  declare cmp_uuid: string;
  declare usr_uuid: string;
  declare uni_uuid: string;
  declare usruni_uuid: string;
  declare fee_uuid: string;
  declare fee_period: string;
  declare fee_amount: number;
  declare fee_duedate: Date;
  declare fee_status: 'Pendiente' | 'Pagada' | 'Vencida';
  declare fee_createdat: Date;
}

SequelizeFee.init({
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
    allowNull: false
  },
  fee_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  fee_period: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fee_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  fee_duedate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fee_status: {
    type: DataTypes.STRING, // 'Pendiente' | 'Pagada' | 'Vencida'
    allowNull: false,
    defaultValue: 'Pendiente'
  },
  fee_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'fee_createdat',
  updatedAt: false, // Solo registra fecha de creación
  tableName: 'fee_fees'
});

SequelizeFee.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});
SequelizeFee.belongsTo(SequelizeUnit, {
  as: 'unit',
  foreignKey: 'uni_uuid'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeFee.sync();
}
