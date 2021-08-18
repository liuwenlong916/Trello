import { IsNotEmpty, Min } from 'class-validator'
import { BoardListCard } from '../models/BoardListCard'
import Boom from '@hapi/boom'

export class PostAddCardBody {
  @IsNotEmpty({
    message: '名称不能为空',
  })
  name: string
  @Min(1, {
    message: '看板id不能为空且必须为数组',
  })
  boardListId: number
  @IsNotEmpty({
    message: '描述不能为空',
  })
  description: string
}
export class PutUpdateCardBody {}

export async function getCardByPk(
  id: number,
  userid: number,
): Promise<BoardListCard> {
  const cart = await BoardListCard.findByPk(id)

  if (!cart) {
    throw Boom.notFound('无卡片')
  }
  if (cart.userId !== userid) {
    throw Boom.forbidden('无权限查看卡片')
  }

  return cart
}
