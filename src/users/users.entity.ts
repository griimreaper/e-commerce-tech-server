import { Column, Model, Table, DataType } from 'sequelize-typescript';
@Table({ tableName: 'users', timestamps: false })
export class Users extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  img: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  address: string;

  @Column
  tel: number;

  @Column
  dni: number;

  @Column
  isAdmin: boolean;

  @Column
  isActive: boolean;
}
