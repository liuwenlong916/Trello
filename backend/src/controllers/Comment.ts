import { Context } from 'koa'
import {
  Body,
  Controller,
  Ctx,
  Get,
  Post,
  Query,
  Flow,
} from 'koa-ts-controllers'
import { Comment as CommentModel } from '../models/Comment'
import { User as UserModel } from '../models/User'
import { getCardByPk } from '../validators/Card'
import { GetCommentsQuery, PostAddCommentBody } from '../validators/Comment'
import authorization from '../middlewares/authorization'

@Controller('/comment')
@Flow([authorization])
export default class CommentController {
  @Get('')
  public async getComments(
    @Ctx() ctx: Context,
    @Query() query: GetCommentsQuery,
  ) {
    let { cardId, page } = query
    const card = await getCardByPk(cardId, ctx.userInfo.id)

    const limit = 2

    const where = {
      boardListCardId: cardId,
    }
    const total = await CommentModel.count({ where })
    const pages = Math.ceil(total / limit)

    if (!page) {
      page = 1
    }
    page = Math.min(page, pages)
    page = Math.max(page, 1)

    const commentList = await CommentModel.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'desc']],
      include: [
        {
          model: UserModel,
          attributes: ['id', 'name'],
        },
      ],
    })
    return { page, pages, limit, commentList: commentList }
  }

  @Post('')
  public async addComment(
    @Ctx() ctx: Context,
    @Body() body: PostAddCommentBody,
  ) {
    console.log(body)
    const { content, cardId } = body
    const model = new CommentModel()
    model.content = content
    model.boardListCardId = cardId
    model.userId = ctx.userInfo.id
    model.save()
    ctx.status = 201
    return model
  }
}
