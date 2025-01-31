import bcryptjs from "bcryptjs";
import { model, Schema } from "mongoose";

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
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    login:{
      type: Boolean,
      default: false
    }
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
  }
}

const User = model("User", UserSchema);
export default User;

