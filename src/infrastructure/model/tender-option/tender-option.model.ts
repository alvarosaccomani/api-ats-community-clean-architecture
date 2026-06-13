import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { TenderOptionEntity } from "../../../domain/tender-option/tender-option.entity";

export class SequelizeTenderOption extends Model<TenderOptionEntity, Omit<TenderOptionEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cla_uuid: string;
  declare ten_uuid: string;
  declare tenopt_uuid: string;
  declare tenopt_providername: string;
  declare tenopt_amount: number;
  declare tenopt_details: string;
  declare tenopt_createdat: Date;
  declare tenopt_updatedat: Date;
}

SequelizeTenderOption.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cla_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ten_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tenopt_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  tenopt_providername: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tenopt_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  tenopt_details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tenopt_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tenopt_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'tenopt_createdat',
  updatedAt: 'tenopt_updatedat',
  tableName: 'tenopt_tenderoptions'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeTenderOption.sync();
}
