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
  Query,
} from 'koa-ts-controllers'
import { Context } from 'koa'
import authorization from '../middlewares/authorization'
import {
  getBoardListByPK,
  GetBoardListQuery,
  PostAddBoardListBody,
  PutUpdateListBody,
} from '../validators/BoardList'
import { getBoardByPK } from '../validators/Board'
import { BoardList as BoardListModel } from '../models/BoardList'

@Controller('/boardlist')
@Flow([authorization])
export default class BoarderListController {
  @Post('')
  public async addBoardList(
    @Ctx() ctx: Context,
    @Body() body: PostAddBoardListBody,
  ) {
    const { boardId, name } = body
    //校验当前面板id是否正确
    await getBoardByPK(boardId, ctx.userInfo.id)

    const maxOrder = await BoardListModel.findOne({
      where: {
        boardId,
      },
      order: [['order', 'desc']],
    })
    const model = new BoardListModel()
    model.boardId = boardId
    model.name = name
    model.order = maxOrder ? maxOrder.order + 65535 : 65535
    model.userId = ctx.userInfo.id
    await model.save()

    ctx.status = 201
    return model
  }
  ///boardlist?boardid=1

  @Get('')
  public async getBoardLists(
    @Ctx() ctx: Context,
    @Query('boardid') boardId: number,
  ) {
    await getBoardByPK(boardId, ctx.userInfo.id)
    const list = await BoardListModel.findAll({
      where: {
        boardId,
      },
      order: [['order', 'asc']],
    })
    return list
  }

  @Get('/:id(\\d+)')
  public async getBoardList(@Ctx() ctx: Context, @Params('id') id: number) {
    const boardList = await getBoardByPK(id, ctx.userInfo.id)
    return boardList
  }

  @Put('/:id(\\d+)')
  public async updateBoardList(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateListBody,
  ) {
    const model = await getBoardListByPK(id, ctx.userInfo.id)
    const { name, boardId, order } = body

    model.name = name || model.name
    model.order = order || model.order
    model.boardId = boardId || model.boardId
    await model.save()

    ctx.status = 204
    // return model
    // put 无返回
    return
  }

  @Delete('/:id(\\d+)')
  public async deleteBoardList(@Ctx() ctx: Context, @Params('id') id: number) {
    const model = await getBoardListByPK(id, ctx.userInfo.id)
    model.destroy()
    ctx.status = 204
    return
  }
}
