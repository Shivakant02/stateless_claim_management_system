import { model, Schema } from "mongoose";

const claimHistorySchema = new Schema({
    pendingClaims:[
        {
            type:Schema.Types.ObjectId,
            ref:"Claim"
        }
    ],
    rejectedClaims:[
        {
            type:Schema.Types.ObjectId,
            ref:"Claim"
        }
    ],
    approvedClaims:[
        {
            type:Schema.Types.ObjectId,
            ref:"Claim"
        }
    ],
})

const ClaimHistory = model("ClaimHistory", claimHistorySchema)
export default ClaimHistory;