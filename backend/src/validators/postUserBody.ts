import { IsNotEmpty } from 'class-validator'

class PostUserBody {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  name: string
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string
}
export default PostUserBody