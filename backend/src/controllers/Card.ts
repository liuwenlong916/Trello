import { Context } from 'koa'
import {
  Body,
  Controller,
  Ctx,
  Delete,
  Flow,
  Get,
  max,
  Params,
  Post,
  Put,
  Query,
} from 'koa-ts-controllers'
import { userInfo } from 'os'
import authorization from '../middlewares/authorization'
import { getBoardListByPK } from '../validators/BoardList'
import {
  getCardByPk,
  PostAddCardBody,
  PutUpdateCardBody,
} from '../validators/Card'
import { BoardListCard as CardModel } from '../models/BoardListCard'
@Controller('card')
@Flow([authorization])
export default class CardController {
  @Post('')
  public async addCard(@Ctx() ctx: Context, @Body() body: PostAddCardBody) {
    const { name, boardListId, description } = body
    await getBoardListByPK(boardListId, ctx.userInfo.id)

    const maxOrder = await CardModel.findOne({
      where: {
        boardListId,
      },
      order: [['order', 'desc']],
    })

    const model = new CardModel()
    model.name = name
    model.description = description
    model.order = maxOrder ? maxOrder.order + 65535 : 65535
    model.userId = ctx.userInfo.id
    await model.save()

    ctx.status = 201
    return model
  }

  @Get('')
  public async getCards(
    @Ctx() ctx: Context,
    @Query('boardlistid') boardListId: number,
  ) {
    await getBoardListByPK(boardListId, ctx.userInfo.id)

    const list = CardModel.findAll({
      where: {
        boardListId,
      },
      order: [['order', 'desc']],
    })

    return list
  }

  @Get('/:id(\\d+)')
  public async getCard(@Ctx() ctx: Context, @Params('id') id: number) {
    const cart = await getCardByPk(id, ctx.userInfo.id)

    return cart
  }
  @Put('/:id(\\d+)')
  public async updateCard(
    @Ctx() ctx: Context,
    @Params('id') id: number,
    @Body() body: PutUpdateCardBody,
  ) {
    const model = await getCardByPk(id, ctx.userInfo.id)
    const { name, description, boardListId } = body
    model.name = name || model.name
    model.boardListId = boardListId || model.boardListId
    model.description = description || model.description

    await model.save()
    ctx.status = 204
    return
  }

  @Delete('/:id(\\d+)')
  public async deleteCard(@Ctx() ctx: Context, @Params('id') id: number) {
    const model = await getCardByPk(id, ctx.userInfo.id)
    model.destroy()
    ctx.status = 204
    return
  }
}
