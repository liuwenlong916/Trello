import configs from './configs'
import Koa from 'koa'
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
