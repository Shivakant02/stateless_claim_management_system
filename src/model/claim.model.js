import { model, Schema } from "mongoose";

const ClaimSchema=new Schema({
  policyId:{
    type:Schema.Types.ObjectId,
    ref:"Policy",
    required:[true,"Please provide a policy id"],
  },
  type:{
    type:String,
  },
  claimAmount:{
    type:Number,
    required:[true,"Please provide a claim amount"],
  },
  claimReason:{
    type:String,
    required:[true,"Please provide a claim reason"],
  },
  status:{
    type:String,
    enum:["pending","approved","rejected"],
    default:"pending",
  },
  policyHolder:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  email:{
    type:String,
  },
},{
  timestamps:true,
});

const Claim=model("Claim",ClaimSchema);
export default Claim;