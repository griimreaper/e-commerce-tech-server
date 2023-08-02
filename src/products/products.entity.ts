/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType } from 'sequelize-typescript';
@Table({ tableName: 'products', timestamps: true })
export class Products extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({allowNull:false,})
  name: string;

  @Column({allowNull:false,})
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull:false,
})
  price: number;

  @Column({allowNull:false,})
  quantity: number;

  @Column
  imageUrl: string;

  @Column({allowNull:false,})
  category: string;

  @Column
  isActive: boolean;
}
