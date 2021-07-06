import { Controller, Get } from "koa-ts-controllers";

@Controller('/hello')
class HelloController{
  @Get('/world')
  async sayWorld(){
    return 'Hello world'
  }
}