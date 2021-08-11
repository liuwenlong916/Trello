import { Board as BoardModel } from '../models/Board'
import { Context } from 'koa'
import {
  Body,
  Controller,
  Ctx,
  Delete,
  Flow,
  Get,
  Params,
  Post,
  Put,
} from 'koa-ts-controllers'
import {
  PostAddBoardBody,
  PutUpdateBoardBody,
  getBoardByPK,
} from '../validators/Board'
import authorization from '../middlewares/authorization'

@Controller('/board')
@Flow([authorization]) //token校验
export default class BoardController {
  // @Post('/addBoard')
  @Post('')
  public async addBoard(@Ctx() ctx: Context, @Body() body: PostAddBoardBody) {
    const { name } = body
    const board = new BoardModel()

    board.name = name
    board.userId = ctx.userInfo.id

    await board.save()
    ctx.status = 201
    return board
  }

  // @Get('/list')
  @Get('')
  public async getBoards(@Ctx() ctx: Context) {
    let where = {
      userId: ctx.userInfo.id,
    }
    const boards = await BoardModel.findAll({ where })
    return boards
  }

  @Get('/:id(\\d+)')
  public async getBoard(@Ctx() ctx: Context, @Params('id') id: number) {
    const board = await getBoardByPK(id, ctx.userInfo.id)
    return board
  }

  @Put('/:id(\\d+)')
  public async updateBoard(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateBoardBody,
  ) {
    const { name } = body
    const board = await getBoardByPK(id, ctx.userInfo.id)
    board.name = name || board.name
    await board.save()

    ctx.status = 204
    return board
  }

  @Delete('/:id(\\d+)')
  public async deleteBoard(@Ctx() ctx: Context, @Params('id') id: number) {
    const board = await getBoardByPK(id, ctx.userInfo.id)
    await board.destroy()
    ctx.status = 204
  }
}
