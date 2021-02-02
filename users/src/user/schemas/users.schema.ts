import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now })
  createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
