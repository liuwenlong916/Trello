import { Body, Controller, Ctx, Post } from 'koa-ts-controllers'
import { RegisterBody } from '../validators/User'
import { User, User as UserModel } from '../models/User'
import Boom from '@hapi/boom';
import { Context } from 'koa'

@Controller("/user")
export default class UserController {
  /**
   * 用户注册
   */
  @Post('/register')
  async register(
    @Ctx() ctx: Context,
    @Body() body: RegisterBody
  ) {
    const { name, password } = body;
    let where = { name }
    let user = await UserModel.findOne({ where })
    if (user) {
      throw Boom.conflict('用户已经存在')
    }
    let newUser = new UserModel();
    newUser.name = name
    newUser.password = password

    console.log('post', newUser)
    await newUser.save()

    ctx.status = 201
    return {
      id: newUser.id,
      name,
      createdAt: newUser.createdAt
    }

  }
}