import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";
import { ClaimCommentEntity } from "../../../domain/claim-comment/claim-comment.entity";
import { SequelizeUser } from "../user/user.model";
import { SequelizeClaim } from "../claim/claim.model";

export class SequelizeClaimComment extends Model<ClaimCommentEntity, Omit<ClaimCommentEntity, "id">> {
    declare cmp_uuid: string;
    declare cla_uuid: string;
    declare clac_uuid: string;
    declare usr_uuid: string;
    declare clac_text: string;
    declare clac_createdat: Date;
}

SequelizeClaimComment.init({
    cmp_uuid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cla_uuid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clac_uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    usr_uuid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clac_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    clac_createdat: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: "clac_createdat",
    updatedAt: false,
    tableName: "clac_claimcomments"
});

SequelizeClaimComment.belongsTo(SequelizeUser, {
    as: "usr",
    foreignKey: "usr_uuid"
});

SequelizeClaimComment.belongsTo(SequelizeClaim, {
    as: "claim",
    foreignKey: "cla_uuid"
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeClaimComment.sync();
}
