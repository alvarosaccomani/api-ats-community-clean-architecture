import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ClaimImageEntity } from "../../../domain/claim-image/claim-image.entity";

export class SequelizeClaimImage extends Model<ClaimImageEntity, Omit<ClaimImageEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cla_uuid: string;
  declare claimg_uuid: string;
  declare claimg_image: string;
  declare claimg_moment: 'Antes' | 'Despues';
  declare claimg_createdat: Date;
  declare claimg_updatedat: Date;
}

SequelizeClaimImage.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cla_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  claimg_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  claimg_image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  claimg_moment: {
    type: DataTypes.STRING, // 'Antes' | 'Despues'
    allowNull: false
  },
  claimg_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  claimg_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'claimg_createdat',
  updatedAt: 'claimg_updatedat',
  tableName: 'claimg_claimimages'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeClaimImage.sync();
}
