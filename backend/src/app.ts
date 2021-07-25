import configs from './configs'
import Koa, { Context, Next } from 'koa'
import { bootstrapControllers, Params } from 'koa-ts-controllers'
import KoaRouter from '@koa/router'
import path from 'path'
import KoaBodyParer from 'koa-bodyparser'
import Boom from '@hapi/boom'
import { Sequelize } from 'sequelize-typescript'
import jwt from 'jsonwebtoken'
import UserInfo from './types/global'
(async () => {
  const app = new Koa()

  const router = new KoaRouter()

  //连接数据库
  const db = new Sequelize({ ...configs.database, models: [__dirname + "/models/**/*"] })


  app.use(async (ctx: Context, next: Next) => {
    let token = ctx.headers['authorization']
    if (token) {
      ctx.userInfo = jwt.verify(token, configs.jwt.privateKey) as UserInfo
    }
    await next()
  })
  //注册路由
  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    versions: [1],
    controllers: [path.resolve(__dirname, 'controllers/**/*')],
    //统一错误处理
    errorHandler: async (err: any, ctx: Context) => {
      console.log("err", err)
      let status = 500
      let body = {
        statusCode: status,
        error: 'Internal Server error',
        message: 'An internal server error occurred',
        errorDetails: '',
      }
      //err分类
      if (err.output) {
        status = err.output.statusCode
        body = { ...err.output.payload }
        if (err.data) {
          body.errorDetails = err.data
        }
      }
      ctx.body = body
      ctx.status = status
    },
  })

  //'*' 失败？
  router.all(/^\/(.*)(?:\/|$)/, async ctx => {
    throw Boom.notFound('没有该路由');
  });
  app.use(KoaBodyParer()) //解析body
  app.use(router.routes())
  console.log(router.routes())
  app.listen(configs.server.port, configs.server.host, () => {
    console.log(
      `服务启动成功：http://${configs.server.host}:${configs.server.port}`,
    )
  })
})()
