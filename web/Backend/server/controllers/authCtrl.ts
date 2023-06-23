import { Request, Response } from "express";
import Users from "../models/userModel";
import Compnaies from "../models/comanyModel";
import bcrypt from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateEmail } from "../middleware/vaild";
import {
  IDecodedToken,
  IUser,
  IUserParams,
  IReqAuth,
} from "../config/interface";
import { OAuth2Client } from "google-auth-library";
import notificationCtrl from "./noticeCtrl";
import request from "request";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, accountno, email, uidai } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "Email or Phone number already exists." });

      // const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, accountno, email, uidai };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/proceed?token=${active_token}`;

      if (validateEmail(email)) {
        sendMail(email, url, "Verify your email address");
        return res.json({ msg: "Success! Please check your email." });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  company: async (req: Request, res: Response) => {
    try {
      const { org, email, password } = req.body;
      // const passwordHash = await bcrypt.hash(password, 12);
      const newUser = { org, email, password };
      const new_company = new Compnaies(newUser);
      await new_company.save();
      return res.json({ msg: "added to our database." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token, password1, password2 } = req.body;

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });

      // const user = await Users.findOne({ email: newUser.email });
      // if (user) return res.status(400).json({ msg: "Account already exists." });

      const new_user = new Users({
        name: newUser.name,
        accountno: newUser.accountno,
        email: newUser.email,
        uidai: newUser.uidai,
        password1: password1,
        password2: password2,
      });
      console.log(new_user);
      const newuser = await new_user.save();
      res.json({ msg: "Account has been activated!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });
      // // if user exists
      console.log(user.password1);
      axios
        .post("http://localhost:6000/match1", {
          img1: password,
          img2: user.password1,
        })
        .then((ret) => {
          if (ret.data.simmilarity > 76) return res.json({ success: true });
          else return res.json({ success: false });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ msg: "i am facing some issues try again later." });
        });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: "",
        }
      );

      return res.json({ msg: "Logged out!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { account } = req.body;

      const user = await Users.findOne({ account });
      if (!user)
        return res.status(400).json({ msg: "This account does not exist." });

      const access_token = generateAccessToken({ id: user._id });

      const url = `${CLIENT_URL}/reset_password/${access_token}`;

      if (validateEmail(account)) {
        sendMail(account, url, "Forgot password?");
        return res.json({ msg: "Success! Please check your email." });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  const regUser = await newUser.save();
  res.json({
    msg: "Registration success!",
    access_token,

    user: { ...regUser._doc, password: "" },
  });
};

export default authCtrl;
