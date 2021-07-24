import { AutoIncrement, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import { Board } from './Board'
import { User } from './User'

@Table({
  tableName: 'BoardList'
})
export class BoardList extends Model<BoardList>{

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

  @ForeignKey(() => Board)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  boardid: number

  @Column(({
    type: DataType.STRING(255),
    allowNull: false
  }))
  name: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  order: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}