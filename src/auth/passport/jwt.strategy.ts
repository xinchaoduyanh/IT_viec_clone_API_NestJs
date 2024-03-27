import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { UserInterface } from 'src/users/users.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN')
    })
  }

  async validate(payload: UserInterface) {
    const { _id, email, name, role } = payload
    return {
      _id,
      email,
      name,
      role
    }
  }
}
