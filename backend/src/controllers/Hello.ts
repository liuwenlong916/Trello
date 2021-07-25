import {
  Controller,
  Get,
  Params,
  Post,
  Body,
  Header,
  Query,
  Ctx,
  Flow,
} from 'koa-ts-controllers'

// import GetUsersQuery from '../validators/getUserQuery'
import { GetUsersQuery, PostUserBody } from '../validators/index'
import Boom from '@hapi/boom' //验证提示信息
import { Context } from 'koa'
import authorization from '../middlewares/authorization'

@Controller('/hello') //类装饰器
class HelloController {
  // @Get('/world')
  // //触发统一错误处理
  // async sayWorld(a: any) {
  //   console.log(a.b)
  //   return 'Hello world'
  // }
  // @Get('/user/:id(\\d+)') //方法装饰器
  // async user(
  //   @Params('id') //形参装饰器
  //   id: number,
  // ) {
  //   return `当前params中的id是${id}`
  // }
  // //Query
  // //body 需要安装 koa-bodyparser
  // //header

  // @Post('/user')
  // async postUser(
  //   @Ctx() ctx: Context,
  //   @Body()
  //   body: PostUserBody,
  //   @Header()
  //   h: any,
  // ) {
  //   // console.log(`头信息：${h}`)
  //   // return `当前提交的body数据是：${JSON.stringify(body)}`
  //   ctx.status = 201
  //   return {
  //     id: 1,
  //     name: body.name,
  //     createAt: new Date(),
  //   }
  // }

  // //query/ body验证
  // @Get('/users')
  // async getUsers(
  //   @Query() query: GetUsersQuery,
  //   // query: {
  //   //    page: number
  //   // },
  // ) {
  //   console.log(`page:${query.page}`)

  //   //业务逻辑错误，用户不存在，
  //   // if (true) {
  //   //   //用户已经注册
  //   //   throw Boom.notFound('注册失败', '用户已经被注册')
  //   // }
  //   return 'query验证'
  // }
  @Get('/auth')
  @Flow([authorization])
  async auth(
    @Ctx()
    ctx: Context
  ) {
    // ctx.body = "不登陆看不到"
    return "不登陆看不到"
  }
}
