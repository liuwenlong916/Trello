import { IsNotEmpty, MaxLength, Min, ValidateIf } from 'class-validator'
import { BoardListCard } from '../models/BoardListCard'
import Boom from '@hapi/boom'

export class PostAddCardBody {
  @IsNotEmpty({
    message: '名称不能为空',
  })
  @MaxLength(255, {
    message: '名称最长255字符',
  })
  name: string

  @Min(1, {
    message: '看板id不能为空且必须为数组',
  })
  boardListId: number

  @ValidateIf(o => o.description !== undefined)
  @MaxLength(2000, {
    message: '描述最上2000字符',
  })
  description: string
}
export class PutUpdateCardBody {
  @ValidateIf(o => o.name != undefined)
  @IsNotEmpty({
    message: '名称不能为空',
  })
  @MaxLength(255, {
    message: '名称最长255字符',
  })
  name: string

  @ValidateIf(o => o.boardList !== undefined)
  @Min(1, {
    message: '看板id必须为数组',
  })
  boardListId: number

  @ValidateIf(o => o.name != undefined)
  @MaxLength(2000, {
    message: '描述最上2000字符',
  })
  description: string
}

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
