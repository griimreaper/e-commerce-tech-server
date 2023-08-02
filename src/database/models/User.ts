/* eslint-disable prettier/prettier */
import { Sequelize, DataTypes, Model } from 'sequelize';

interface UserAttributes extends Model {
  id: string;
  name: string;
  lastname: string;
  username: string;
  password: string;
  img?: string;
  email: string;
  address?: string;
  tel?: number;
  dni?: number;
  isAdmin: boolean;
  isActive: boolean;
  confirmationCode?: string;
}

export default (sequelize: Sequelize) => {
  const User = sequelize.define<UserAttributes>(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      tel: {
        type: DataTypes.BIGINT,
      },
      dni: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return User;
};
