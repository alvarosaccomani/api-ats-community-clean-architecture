import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { TransactionEntity } from "../../../domain/transaction/transaction.entity";

import { SequelizeUser } from '../user/user.model';
import { SequelizeUnit } from '../unit/unit.model';
import { SequelizeFee } from '../fee/fee.model';

export class SequelizeTransaction extends Model<TransactionEntity, Omit<TransactionEntity, 'id'>> {
  declare cmp_uuid: string;
  declare usr_uuid: string;
  declare uni_uuid: string;
  declare usruni_uuid: string;
  declare fee_uuid: string;
  declare tra_uuid: string;
  declare tra_gatewayid: string;
  declare tra_totalamount: number;
  declare tra_platformfee: number;
  declare tra_recipientamount: number;
  declare tra_status: 'Approved' | 'Pending' | 'Rejected';
  declare tra_createdat: Date;
}

SequelizeTransaction.init({
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
    allowNull: false
  },
  tra_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  tra_gatewayid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tra_totalamount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  tra_platformfee: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  tra_recipientamount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  tra_status: {
    type: DataTypes.STRING, // 'Approved' | 'Pending' | 'Rejected'
    allowNull: false,
    defaultValue: 'Pending'
  },
  tra_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'tra_createdat',
  updatedAt: false, // Solo registra fecha de creación
  tableName: 'tra_transactions'
});

SequelizeTransaction.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});
SequelizeTransaction.belongsTo(SequelizeUnit, {
  as: 'unit',
  foreignKey: 'uni_uuid'
});
SequelizeTransaction.belongsTo(SequelizeFee, {
  as: 'fee',
  foreignKey: 'fee_uuid'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeTransaction.sync();
}
