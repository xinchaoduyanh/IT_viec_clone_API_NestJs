import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>
@Schema()
export class User {
  @Prop()
  name: string

  @Prop()
  email: number

  @Prop()
  password: string

  @Prop()
  age: number

  @Prop()
  address: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
