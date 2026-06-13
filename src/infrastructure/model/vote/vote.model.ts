import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { VoteEntity } from "../../../domain/vote/vote.entity";

export class SequelizeVote extends Model<VoteEntity, Omit<VoteEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cla_uuid: string;
  declare ten_uuid: string;
  declare usr_uuid: string;
  declare vto_uuid: string;
  declare tenopt_uuid: string;
  declare vto_createdat: Date;
}

SequelizeVote.init({
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
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vto_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  tenopt_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vto_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'vto_createdat',
  updatedAt: false, // Solo necesitamos la fecha de creación para el voto
  tableName: 'vto_votes'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeVote.sync();
}
