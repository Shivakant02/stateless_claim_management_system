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
    },
    end_date:{
      type:Date,
    },
    status:{
      type:String,
      enum:["active","inactive"],
      default:"active",
    },
    policyHolder:{
      type:String,
      required:[true,"Please provide a policy holder"],
    }
  },{
  timestamps:true,
});

const Policy=mongoose.model("Policy",PolicySchema);
export default Policy;