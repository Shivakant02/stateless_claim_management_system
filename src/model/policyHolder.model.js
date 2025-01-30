export class PolicyHolder {
  constructor(req) {
    this.id = Math.floor(Math.random() * 1000000);
    this.firstName = req.body.firstName;
    this.lastName = req.body.lastName;
    this.email = req.body.email;
    this.phone_no = req.body.phone_no;
    this.address = req.body.address;
    this.bankId = req.body.bankId;
    this.city = req.body.city;
    this.state = req.body.state;
    this.pincode = req.body.pincode;
    this.timeStamps = new Date().toISOString();
  }
}

export const policyHolder_db = {};
