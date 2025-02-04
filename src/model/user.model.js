import bcryptjs from "bcryptjs";
import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide a fullname"],
      trim: true,
      minLength: [3, "Fullname must be at least 3 characters"],
      maxLength: [50, "Fullname must not be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    dateOfBirth: {
      type: Date,
        },
        gender:{
          type:String
        },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?rs=1&pid=ImgDetMain",
    },
    policies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Policy",
      },
    ],
    claims:[
      {
        type: Schema.Types.ObjectId,
        ref: "Claim",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// to hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
 
  this.password = await bcryptjs.hashSync(this.password, 10);
});

UserSchema.methods={
  comparePassword:async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password)
  },
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY
    )
}
}

const User = model("User", UserSchema);
export default User;

