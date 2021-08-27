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
  getAttachmentByPk,
  getCardAttachmentByPk,
  getCardByPk,
  PostAddCardBody,
  PutUpdateCardBody,
} from '../validators/Card'
import { BoardListCard as CardModel } from '../models/BoardListCard'
import { CardAttachment as CardAttachmentModel } from '../models/CardAttachment'
import { Comment as CommentModel } from '../models/Comment'
import { Attachment as AttachmentModel } from '../models/Attachment'
import configs from '../configs'
import Boom from '@hapi/boom'
import fs from 'fs'
import path from 'path'

@Controller('/card')
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
    model.boardListId = boardListId
    model.description = description || ''
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

    const list = await CardModel.findAll({
      where: {
        boardListId,
      },
      order: [['order', 'asc']],
      include: [
        {
          model: CommentModel,
          attributes: ['id'],
        },
        {
          model: CardAttachmentModel,
          include: [
            {
              model: AttachmentModel,
            },
          ],
        },
      ],
    })

    let modelList = list.map((card: CardModel) => {
      //前端动态生成coverPath
      // let coverPath = ''
      let attachments = card.attachments.map(attachment => {
        const data = attachment.toJSON() as CardAttachmentModel & {
          path: string
        }
        data.path = configs.storage.prefix + data.detail.name
        // if (data.isCover) {
        //   coverPath = data.path
        // }

        return data
      })

      return {
        id: card.id,
        userId: card.userId,
        boardListId: card.boardListId,
        order: card.order,
        name: card.name,
        description: card.description,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        commentCount: card.comments.length,
        // coverPath,
        attachments,
      }
    })

    return modelList
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
    const { name, description, boardListId, order } = body
    model.name = name || model.name
    model.boardListId = boardListId || model.boardListId
    model.description = description || model.description
    model.order = order || model.order

    await model.save()
    // ctx.status = 204
    return model
  }

  @Delete('/:id(\\d+)')
  public async deleteCard(@Ctx() ctx: Context, @Params('id') id: number) {
    const model = await getCardByPk(id, ctx.userInfo.id)
    model.destroy()
    ctx.status = 204
    return
  }

  @Post('/attachment')
  public async addAttachment(@Ctx() ctx: Context, @Body() body: any) {
    const { cardId } = body
    const card = await getCardByPk(cardId, ctx.userInfo.id)
    if (!ctx.request.files || !ctx.request.files.attachment) {
      throw Boom.badData('缺少附件')
    }
    const file: any = ctx.request.files.attachment

    const attachment = new AttachmentModel()
    attachment.userId = ctx.userInfo.id
    attachment.originName = file.name
    attachment.name = file.path.split('\\').pop() as string
    attachment.size = file.size
    attachment.type = file.type
    await attachment.save()

    const cardAttachment = new CardAttachmentModel()
    cardAttachment.userId = ctx.userInfo.id
    cardAttachment.attachmentId = attachment.id
    cardAttachment.boardListCardId = card.id
    await cardAttachment.save()

    ctx.status = 201
    return {
      id: cardAttachment.id,
      boardListCardId: card.id,
      attachmentId: attachment.id,
      userId: ctx.userInfo.id,
      path: configs.storage.prefix + attachment.name,
      isCover: false,
      detail: attachment,
    }
  }

  @Delete('/attachment/:id(\\d+)')
  public async deleteAttachment(@Ctx() ctx: Context, @Params('id') id: number) {
    const cardAttachment = await getCardAttachmentByPk(id, ctx.userInfo.id)
    const attachment = await getAttachmentByPk(cardAttachment.attachmentId)
    //1.删除文件
    const dir = path.resolve(configs.storage.dir, attachment.name)
    await fs.exists(dir, () => {
      fs.unlinkSync(dir)
    })
    //2.删除CardAttachment表
    await cardAttachment.destroy()
    //3.删除Attachment表
    await attachment.destroy()
    ctx.status = 204
    return
  }
  @Put('/attachment/setCover/:id(\\d+)')
  public async setCover(@Ctx() ctx: Context, @Params('id') id: number) {
    const model = await getCardAttachmentByPk(id, ctx.userInfo.id)

    await CardAttachmentModel.update(
      {
        isCover: false,
      },
      {
        where: {
          boardListCardId: model.boardListCardId,
        },
      },
    )

    model.isCover = true
    model.save()
    ctx.status = 204
    return
  }
  @Put('/attachment/removeCover/:id(\\d+)')
  public async removeCover(@Ctx() ctx: Context, @Params('id') id: number) {
    const model = await getCardAttachmentByPk(id, ctx.userInfo.id)
    model.isCover = false
    model.save()
    ctx.status = 204
    return
  }
}
