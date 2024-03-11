import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>
@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
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
