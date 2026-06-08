import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CurrencyEntity } from "../../../domain/currency/currency.entity";

export class SequelizeCurrency extends Model<CurrencyEntity, Omit<CurrencyEntity, 'id'>> {
  declare cur_uuid: string;
  declare cur_code: string;
  declare cur_symbol: string;
  declare cur_name: string;
  declare cur_description: string;
  declare cur_image: string;
  declare cur_createdat: Date;
  declare cur_updatedat: Date;
}

SequelizeCurrency.init({
  cur_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cur_code: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  cur_symbol: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cur_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cur_description: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  cur_image: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  cur_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cur_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cur_createdat',
  updatedAt: 'cur_updatedat',
  tableName: 'cur_currencies'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCurrency.sync();
}