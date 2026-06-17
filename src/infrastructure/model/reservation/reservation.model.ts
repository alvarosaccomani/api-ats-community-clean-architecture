import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ReservationEntity } from "../../../domain/reservation/reservation.entity";
import { SequelizeSpace } from '../space/space.model';
import { SequelizeUser } from '../user/user.model';

export class SequelizeReservation extends Model<ReservationEntity, Omit<ReservationEntity, 'id'>> {
  declare cmp_uuid: string;
  declare sit_uuid: string;
  declare spa_uuid: string;
  declare res_uuid: string;
  declare usr_uuid: string;
  declare res_date: Date;
  declare res_slot: string;
  declare res_status: 'Aprobada' | 'Pendiente' | 'Cancelada';
}

SequelizeReservation.init({
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
  res_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  res_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  res_slot: {
    type: DataTypes.STRING,
    allowNull: false
  },
  res_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendiente'
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'res_createdat',
  updatedAt: 'res_updatedat',
  tableName: 'res_reservations'
});

SequelizeReservation.belongsTo(SequelizeSpace, {
  as: 'space',
  foreignKey: 'spa_uuid'
});
SequelizeReservation.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});

if (process.env.NODE_ENV !== "production") {
    SequelizeReservation.sync();
}
