import koa from 'koa'
import UserInfo from './global'

declare module 'koa' {
  interface Context {
    userInfo: UserInfo
  }
}