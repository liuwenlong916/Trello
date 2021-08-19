import { Context, Next } from 'koa'
import Boom from '@hapi/boom'
import configs from '../configs'
import jwt from 'jsonwebtoken'
import UserInfo from '../types/global'

export default async function authorization(ctx: Context, next: Next) {
  const token = ctx.headers['authorization']
  try {
    if (token) {
      ctx.userInfo = jwt.verify(token, configs.jwt.privateKey) as UserInfo
    }
    await next()
  } catch (e) {
    console.log(e)
    if (e.name == 'TokenExpiredError') {
      throw Boom.unauthorized('权限过期')
    } else {
      throw Boom.unauthorized('无权限')
    }
  }
}
