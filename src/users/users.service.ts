import { Injectable } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword = (password: string) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto
    const user = await this.userModel.create({ email, password: this.hashPassword(password), name })
    return user
  }

  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id) === false) {
      // throw new Error('Invalid ID')
      return 'not found user'
    }
    const user = await this.userModel.findOne({ _id: id })
    return user
  }
  findOnebyUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
  }
  async update(updateUserDto: UpdateUserDto) {
    const { email, _id, name } = updateUserDto
    const user = await this.userModel.findOneAndUpdate({ _id: _id }, { email, name }, { new: true })
    return user
  }
  remove(id: string) {
    if (mongoose.Types.ObjectId.isValid(id) === false) {
      // throw new Error('Invalid ID')
      return 'not found user'
    }
    return this.userModel.deleteOne({ _id: id })
  }
  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword)
  }
}
