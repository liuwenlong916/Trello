import Boom from '@hapi/boom'
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Min,
  ValidateIf,
} from 'class-validator'
import { BoardList as BoardListModel } from '../models/BoardList'

export class PostAddBoardListBody {
  @Min(1, {
    message: '面板id必须为数字',
  })
  boardId: number

  @IsNotEmpty({
    message: '列表名称不能为空',
  })
  name: string
}
export class GetBoardListQuery {
  @IsNumberString(
    {},
    {
      message: '面板id必须为数字',
    },
  )
  boardId: number
}
export class PutUpdateListBody {
  @ValidateIf(o => o.boardId !== undefined)
  @Min(1, {
    message: '面板id必须为数字',
  })
  boardId: number

  @ValidateIf(o => o.name !== undefined)
  @IsNotEmpty({
    message: '列表名称不能为空',
  })
  name: string

  @ValidateIf(o => o.order !== undefined)
  @IsNumber(
    {},
    {
      message: '列表名称不能为空',
    },
  )
  order: number
}

export async function getBoardListByPK(
  id: number,
  userid: number,
): Promise<BoardListModel> {
  console.log('PK', id, userid)
  const boardList = await BoardListModel.findByPk(id)

  if (!boardList) {
    throw Boom.notFound('指定列表不存在')
  }
  if (boardList.userId != userid) {
    throw Boom.forbidden('禁止访问该列表')
  }
  return boardList
}
