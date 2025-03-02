export class Claim {
  constructor(req) {
    this.id = Math.floor(Math.random() * 1000000);
    this.user_email = req.body.user_email;
    this.policyNumber = req.body.policyNumber;
    this.dateOfLoss = req.body.dateOfLoss;
    this.lossDescription = req.body.lossDescription;
    this.lossAmount = req.body.lossAmount;
    this.status = "pending";
    this.timeStamps = new Date().toISOString();
  }
}

export const claim_db = {};
