import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { TenderEntity } from "../../../domain/tender/tender.entity";

export class SequelizeTender extends Model<TenderEntity, Omit<TenderEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cla_uuid: string;
  declare ten_uuid: string;
  declare ten_votingdeadline: Date;
  declare ten_status: 'Activa' | 'Cerrada' | 'Desierta';
  declare ten_createdat: Date;
  declare ten_updatedat: Date;
}

SequelizeTender.init({
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
    primaryKey: true
  },
  ten_votingdeadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ten_status: {
    type: DataTypes.STRING, // o ENUM, usamos STRING para coincidir con la flexibilidad de TypeScript
    allowNull: false,
    defaultValue: 'Activa'
  },
  ten_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ten_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ten_createdat',
  updatedAt: 'ten_updatedat',
  tableName: 'ten_tenders'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeTender.sync();
}
