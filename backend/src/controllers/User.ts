import { Body, Controller, Ctx, Post } from 'koa-ts-controllers'
import { RegisterBody, LoginBody } from '../validators/User'
import { User, User as UserModel } from '../models/User'
import Boom from '@hapi/boom'
import { Context } from 'koa'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import configs from '../configs'

@Controller('/user')
export default class UserController {
  /**
   * 注册
   * @param ctx
   * @param body
   * @returns
   */
  @Post('/register')
  async register(@Ctx() ctx: Context, @Body() body: RegisterBody) {
    const { name, password } = body
    let where = { name }
    let user = await UserModel.findOne({ where })
    if (user) {
      throw Boom.conflict('注册失败', '用户已经存在')
    }
    let newUser = new UserModel()
    newUser.name = name
    newUser.password = password

    console.log('post', newUser)
    await newUser.save()

    ctx.status = 201
    return {
      id: newUser.id,
      name,
      createdAt: newUser.createdAt,
    }
  }

  /**
   * 登录
   * @param ctx
   * @param body
   * @returns
   */
  @Post('/login')
  async login(@Ctx() ctx: Context, @Body() body: LoginBody) {
    let { name, password } = body
    let user = await UserModel.findOne({
      where: { name },
    })

    if (!user) {
      throw Boom.notFound('登录失败', '用户不存在')
    }
    let md5 = crypto.createHash('md5')
    password = md5.update(password).digest('hex')
    if (password !== user.password) {
      throw Boom.forbidden('登录失败', '密码错误')
    }
    const userInfo = {
      id: user.id,
      name,
    }
    const token = jwt.sign(userInfo, configs.jwt.privateKey)
    ctx.set('authorization', token) //设置头信息
    ctx.status = 201
    return userInfo
  }
}
