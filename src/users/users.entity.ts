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
  firstName: string;
}
