import { Document, Types } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  name: string;
  accountno: Number;
  password1: Buffer;
  password2: Buffer;
  uidai: Number;
  _doc: object;
}

export interface INewUser {
  name: string;
  email: string;
  accountno: Number;
  uidai: Number;
  // password1: Buffer;
  // password2: Buffer;
}

export interface INotice extends Document {
  user: string;
  msg: string;
  desc: string;
  url?: string;
  _doc: object;
}

export interface INotification {
  user: string;
  msg: [
    {
      msg: string;
      desc: string;
      time: Date;
      url?: string;
    }
  ];
  new: boolean;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IUserParams {
  name: string;
  account: string;
  password: string;
  avatar?: string;
  type: string;
  referer?: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}
