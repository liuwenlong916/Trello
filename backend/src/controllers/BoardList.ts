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
  GetBoardListQuery,
  PostAddBoardListBody,
  PutBoardListBody,
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
    ctx.status = 201
    await model.save()

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
      order: [['order', 'desc']],
    })
    return list
  }

  @Get('/id(\\d+)')
  public async getBoardList(@Ctx() ctx: Context, @Params('id') id: number) {}

  @Put('/id(\\d+)')
  public async updateBoardList(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutBoardListBody,
  ) {}

  @Delete('/id(\\d+)')
  public async deleteBoardList(@Ctx() ctx: Context, @Params('id') id: number) {}
}
