import mongoose from "mongoose";

const PolicySchema=new mongoose.Schema({
  type:{
    type:String,
    required:[true,"Please provide a policy type"],
    
  },
  coverage:{
    type:Number,
    required:[true,"Please provide a coverage amount"],
    
  },
    premium:{
      type:Number,
      required:[true,"Please provide a premium amount"],
      
    },
    start_date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB'), // 'en-GB' formats as dd-mm-yyyy
    },
    end_date: {
      type: String,
      default: () => {
        const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        return futureDate.toLocaleDateString('en-GB');
      },
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
    avatar:{
      type:String
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