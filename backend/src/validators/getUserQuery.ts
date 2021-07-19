import { IsNumberString } from 'class-validator'

class GetUsersQuery {
  @IsNumberString(
    {},
    {
      message: 'page必须是数字',
    },
  )
  page: number
}
export default GetUsersQuery
