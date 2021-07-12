import configs from './configs'
import Koa, { Context } from 'koa'
import { bootstrapControllers, Params } from 'koa-ts-controllers'
import KoaRouter from 'koa-router'
import path from 'path'
import KoaBodyParer from 'koa-bodyparser'
import Boom from '@hapi/boom'
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
        errorDetails: '',
      }
      //err分类
      console.log(err)
      if (err.output) {
        ;(status = err.output.statusCode), (body = { ...err.output.payload })
        if (err.data) {
          body.errorDetails = err.data
        }
      }
      ctx.body = body
      ctx.status = status
    },
  })

  //失败？
  // router.all('*', async ctx => {
  //   throw Boom.notFound()
  // })
  // router.all('/test', ctx => {
  //   ctx.body = 'all'
  // })
  app.use(KoaBodyParer()) //解析body
  app.use(router.routes())
  console.log(router.routes())
  app.listen(configs.server.port, configs.server.host, () => {
    console.log(
      `服务启动成功：http://${configs.server.host}:${configs.server.port}`,
    )
  })
})()
