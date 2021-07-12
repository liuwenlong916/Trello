import { IsNumberString } from 'class-validator'

class GetUsersQuery {
  @IsNumberString()
  page: number
}
export default GetUsersQuery
