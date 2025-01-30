export class Bank {
  constructor(req) {
    this.id = Math.floor(Math.random() * 1000000);
    this.bankName = req.body.bankName;
    this.ifscCode = req.body.ifscCode;
    this.branch = req.body.branch;
    this.city = req.body.city;
    this.state = req.body.state;
    this.contactNo = req.body.contactNo;
    this.timeStamps = new Date().toISOString();
  }
}

export const bank_db = {};
