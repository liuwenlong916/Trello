import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import User from "./User"

@Table({
  tableName: 'Board'
})
export default class Board extends Model<Board> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  userId: number

  @AllowNull
  @Column({
    type: DataType.STRING(255)
  })
  name: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}