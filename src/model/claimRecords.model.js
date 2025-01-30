export class ClaimRecords {
  constructor(claim) {
    this.id = Math.floor(Math.random() * 100000) + 1;
    this.claimNumber = claim.claimNumber;
    this.claimId = claim.Id;
    this.policyHolderId = claim.user_id;
    this.dateOfLoss = claim.dateOfLoss;
    this.description = claim.description;
    this.lossAmount = claim.lossAmount;
    this.status = claim.status;
    this.timeStamp = new Date().toISOString();
  }
}
export const claim_records_db = {};
