import User from "../models/user.model.js";
import EmailOtp from "../models/emailOtp.model.js";
import createError from "../utils/createError.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const createOtpCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const requestEmailOtp = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email) return next(createError(400, "Email is required."));

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createError(409, "Email is already registered."));

    const code = createOtpCode();
    const codeHash = bcrypt.hashSync(code, 5);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await EmailOtp.deleteMany({ email });
    await EmailOtp.create({ email, codeHash, expiresAt });

    const sent = await sendEmail({
      to: email,
      subject: "Your thriftU verification code",
      text: `Your thriftU verification code is ${code}. It expires in 10 minutes.`,
      html: `<p>Your thriftU verification code is <strong>${code}</strong>.</p><p>It expires in 10 minutes.</p>`,
    });

    res.status(200).send({
      message: "Verification code sent.",
      ...(sent ? {} : { devOtp: code }),
    });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = req.body.otp?.trim();

    if (!otp) return next(createError(400, "Email verification code is required."));

    const otpRecord = await EmailOtp.findOne({ email });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return next(createError(400, "Verification code has expired."));
    }

    if (otpRecord.attempts >= 5) {
      return next(createError(429, "Too many code attempts. Request a new code."));
    }

    const isOtpCorrect = bcrypt.compareSync(otp, otpRecord.codeHash);
    if (!isOtpCorrect) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return next(createError(400, "Invalid verification code."));
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username: req.body.username }],
    });
    if (existingUser) return next(createError(409, "Username or email is already registered."));

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      email,
      password: hash,
    });

    await newUser.save();
    await EmailOtp.deleteMany({ email });
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, cookieOptions)
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .status(200)
    .send("User has been logged out.");
};
