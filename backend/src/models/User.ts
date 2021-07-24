import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript"

// const crypto = require('crypto')
import crypto from 'crypto'

@Table({
  tableName: 'User'
})
export class User extends Model<User> {

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
  @Column//不写 生成sql时不会添加该字段
  set password(val: string) {
    let md5 = crypto.createHash('md5')
    let newPassword = md5.update(`${val}`).digest('hex')
    console.log('set', val, newPassword)
    this.setDataValue("password", newPassword)
  }

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}