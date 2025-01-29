export class Policy {
  constructor(req) {
    this.id = Math.floor(Math.random() * 1000000);
    this.policyNumber = req.body.policyNumber;
    this.policyHolderId = req.body.user_id;
    this.type = req.body.type;
    this.start_date = req.body.start_date;
    this.valid_till = req.body.valid_till;
    this.coverage = req.body.coverage;
    this.status = "Pending";
    this.premium = req.body.premium;
    this.timeStamp = new Date().toISOString();
  }
}

export const policy_db = {};
