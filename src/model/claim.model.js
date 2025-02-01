import { model, Schema } from "mongoose";

const ClaimSchema=new Schema({
  policyId:{
    type:Schema.Types.ObjectId,
    ref:"Policy",
    required:[true,"Please provide a policy id"],
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
  }
},{
  timestamps:true,
});

const Claim=model("Claim",ClaimSchema);
export default Claim;