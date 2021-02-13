import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LANGUAGES } from 'src/utils';

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

  @Prop({ required: true, default: LANGUAGES.Fr})
  language: string

  @Prop({ required: true, default: LANGUAGES.Fr})
  targetLanguage: string

  @Prop({ required: true, default: {language: LANGUAGES.Fr, level: 1}})
  levels: {language: string, level: number}[];

  @Prop({ required: true, default: ''})
  userBoard: string

  @Prop({ default: Date.now })
  createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
