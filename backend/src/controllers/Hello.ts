import {
  Controller,
  Get,
  Params,
  Post,
  Body,
  Header,
  Query,
} from 'koa-ts-controllers'
import { IsNumberString } from 'class-validator'

class GetUsersQuery {
  @IsNumberString(
    {},
    {
      message: 'page必须为数字', //自定义错误提示信息
    },
  ) //验证是否为数字字符串
  page: number
}

@Controller('/hello') //类装饰器
class HelloController {
  @Get('/world')
  //触发统一错误处理
  async sayWorld(a: any) {
    console.log(a.b)
    return 'Hello world'
  }
  @Get('/user/:id(\\d+)') //方法装饰器
  async user(
    @Params('id') //形参装饰器
    id: number,
  ) {
    return `当前params中的id是${id}`
  }
  //Query
  //body 需要安装 koa-bodyparser
  //header

  @Post('user')
  async postUser(
    @Body()
    body: {
      name: string
      password: string
    },
    @Header()
    h: any,
  ) {
    console.log(`头信息：${h}`)
    return `当前提交的body数据是：${JSON.stringify(body)}`
  }

  //query/ body验证
  @Get('/users')
  async getUsers(
    @Query() query: GetUsersQuery,
    // query: {
    //    page: number
    // },
  ) {
    console.log(`page:${query.page}`)
    return 'query验证'
  }
}
