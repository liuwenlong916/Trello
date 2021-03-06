import {
  IsNumber,
  IsNumberString,
  MaxLength,
  ValidateIf,
} from 'class-validator'

export class PostAddCommentBody {
  @IsNumberString(
    {},
    {
      message: 'boardListCardId必须为数字',
    },
  )
  cardId: number

  @MaxLength(2000, {
    message: '评论内容不能大于2000个字符',
  })
  content: string
}

export class GetCommentsQuery {
  @IsNumberString(
    {},
    {
      message: 'boardListCardId必须为数字',
    },
  )
  cardId: number

  @ValidateIf(o => o.page !== undefined)
  @IsNumberString(
    {},
    {
      message: '分页必须是数字',
    },
  )
  page?: number
}
