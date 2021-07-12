import { Controller, Get, Params, Post, Body, Header } from 'koa-ts-controllers'

@Controller('/hello') //类装饰器
class HelloController {
  @Get('/world')
  async sayWorld() {
    return 'Hello world'
  }
  @Get('/user/:id') //方法装饰器
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
}
