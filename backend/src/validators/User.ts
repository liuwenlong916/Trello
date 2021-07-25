import { IsNotEmpty, Length } from "class-validator"
import { IsSameValue } from "./custom/IsSameValue"//自定义装饰器

class Body {
  @Length(1, 50, {
    message: '用户名不能为空，长度不能大于50'
  })
  name: string

  @IsNotEmpty({
    message: '密码不能为空'
  })
  password: string
}

export class RegisterBody extends Body {

  @IsSameValue('password', {
    message: '两次密码不一致'
  })
  rePassword: string
}

export class LoginBody extends Body {

}