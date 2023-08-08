/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType } from 'sequelize-typescript';
@Table({ tableName: 'shoes', timestamps: true })
export class Products extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  brand: string;

  @Column({ allowNull: false })
  model: string;

  @Column({ allowNull: false })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT
  })
  size: number;

  @Column(
    {
      type: DataType.ARRAY(DataType.STRING),
    },
  )
    img: string[];

  @Column
  isActive: boolean;
}
