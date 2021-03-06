import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  constructor(user?: Partial<User>) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.cpf = user.cpf;
  }

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  cpf: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
