import mongoose from "mongoose";

const PolicySchema=new mongoose.Schema({
  type:{
    type:String,
    required:[true,"Please provide a policy type"],
    enum:["life","health","auto","home","travel","business","pet"],
  },
  coverage:{
    type:Number,
    required:[true,"Please provide a coverage amount"],
    enum:[300000,500000,1000000,2000000,5000000],
  },
    premium:{
      type:Number,
      required:[true,"Please provide a premium amount"],
      enum:[1000,2000,3000,4000,5000],
    },
    start_date:{
      type:Date,
      default:Date.now()
    },
    end_date:{
      type:Date,
      default:Date.now()+365*24*60*60*1000,
    },
    status:{
      type:String,
      enum:["active","inactive"],
      default:"active",
    },
    policyHolder:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    isClaimed:{
      type:Boolean,
      default:false,
    },
  },{
  timestamps:true,
});

const Policy=mongoose.model("Policy",PolicySchema);
export default Policy;