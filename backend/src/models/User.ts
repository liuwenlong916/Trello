import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript"

// const crypto = require('crypto')
import crypto from 'crypto'

@Table({
  tableName: 'User'
})
export default class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(50)
  })
  name: string

  // password: string
  set password(val: string) {
    let md5 = crypto.createHash('md5')
    let newPassword = md5.update(val).digest('hex')
    this.setDataValue("password", newPassword)
  }

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}