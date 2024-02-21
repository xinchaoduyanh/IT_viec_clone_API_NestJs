import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return 'This action returns all users'
  }

  @Post()
  create(@Body() body: any): string {
    return `This action adds a new user with name: ${body.name}`
  }
}
