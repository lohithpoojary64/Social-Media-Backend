import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
//username , email , fullname , password , watchHistory ,

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true, //we use trim to avoid unnessesary spacing in the username
      index: true, //basically it is used to retrive data fast
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    Profile: {
      type: String,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    watchHistory: [(type = String)],
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Here I will hash my password and I will create a web token.
//I cannot create do it directly , so to do so I need to create one middleware
//I want the middle ware to handle so tasks before the user submits the password.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hash(this.password);
  next();
});

//now I need to compare the password of the user from the hashed password ,that I got from bcrypt.
//So to do so I need to use methods . Since the schema provides access to many methods .
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); //bcrypt provides a method to compare the original password and the hashed password . that is .compare method.
  } catch (error) {
    console.log(
      "There is an error while comparing the original and hashed password",
      error
    );
    throw error;
  }
};

//Now Iam creating a generatingToken method to generate token using jwt.

userSchema.methods.generateAccessToken = function () {
  Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_REJECT,
    }
  );
};

//Now creating refresh token

userSchema.methods.generateRefereshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFERESH_TOKEN_REJECT,
    }
  );
};

export const User = mongoose.model("User", userSchema);
