import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
