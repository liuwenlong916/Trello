import { IsNotEmpty, MaxLength, ValidateIf } from 'class-validator'
import Boom from '@hapi/boom'
import { Board as BoardModel } from '../models/Board'
import { Context } from 'koa'

export class PostAddBoardBody {
  @IsNotEmpty({
    message: '面板名称不能为空',
  })
  @MaxLength(255, {
    message: '面板名称不能超过255个字符',
  })
  name: string
}
export class PutUpdateBoardBody {
  @ValidateIf(o => o.name !== undefined)
  @MaxLength(255, {
    message: '面板名称不能超过255个字符',
  })
  name: string
}

export async function getBoardByPK(
  id: number,
  userid: number,
): Promise<BoardModel> {
  const board = await BoardModel.findByPk(id)
  if (!board) {
    throw Boom.notFound('指定面板不存在')
  }
  if (board.userId !== userid) {
    throw Boom.forbidden('禁止访问该面板')
  }
  return board
}
