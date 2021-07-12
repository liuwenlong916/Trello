import configs from './configs'
import Koa, { Context } from 'koa'
import { bootstrapControllers, Params } from 'koa-ts-controllers'
import KoaRouter from 'koa-router'
import path from 'path'
import KoaBodyParer from 'koa-bodyparser'
;(async () => {
  const app = new Koa()

  const router = new KoaRouter()

  //注册路由
  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    versions: [1],
    controllers: [path.resolve(__dirname, 'controllers/**/*')],
    //统一错误处理
    errorHandler: async (err: any, ctx: Context) => {
      let status = 500
      let body = {
        statusCode: status,
        error: 'Internal Server error',
        message: 'An internal server error occurred',
      }
      ctx.body = body
      ctx.status = status
    },
  })

  app.use(KoaBodyParer()) //解析body
  app.use(router.routes())
  console.log(router.routes())
  app.listen(configs.server.port, configs.server.host, () => {
    console.log(
      `服务启动成功：http://${configs.server.host}:${configs.server.port}`,
    )
  })
})()
