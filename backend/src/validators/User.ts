import { IsNotEmpty, Length } from "class-validator"
import { IsSameValue } from "./custom/IsSameValue"//自定义装饰器


export class RegisterBody {
  @Length(1, 50, {
    message: '用户名不能为空，当度不能大于50'
  })
  name: string

  @IsNotEmpty({
    message: '密码不能为空'
  })
  password: string

  @IsSameValue('password', {
    message: '两次密码不一致'
  })
  rePassword: string
}