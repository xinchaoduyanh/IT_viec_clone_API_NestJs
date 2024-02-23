import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common'
import { UsersService } from './users.service'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from './dto/create-user.dto'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    // @Body('email') email: string, @Body('password') password: string, @Body('name') name: string
    @Body() CreateUserDto: CreateUserDto
  ) {
    return this.usersService.create(CreateUserDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() CreateUserDto: CreateUserDto) {
    return this.usersService.update(id, CreateUserDto)
  }
}
