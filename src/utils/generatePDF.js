import PDFDocument from "pdfkit";

export const generatePolicyPDF = async (policy, user) => {
  const doc = new PDFDocument();

//   console.log(policy,user)

  const buffers = [];
  doc.on("data", (chunk) => {
    buffers.push(chunk); // Collect the data chunks
  });

  doc.on("end", () => {
    console.log('PDF document generation completed.');
  });

  // Add some basic content to the PDF
  doc.fontSize(16).text(`U-Insure`, { align: "center" });
  doc.fontSize(16).text(`Policy Details`, { align: "left" });
  doc.moveDown();
  doc.text(`Policy Holder: ${user.fullname}`);
  doc.text(`Policy Type: ${policy.type}`);
  doc.text(`Coverage: ${policy.coverage}`);
  doc.text(`Premium: ${policy.premium}`);
  doc.text(`Policy ID: ${policy._id}`);
  doc.text(`Date of Purchase: ${policy.start_date}`);
  doc.text(`Valid till: ${policy.end_date}`);
  doc.text(`Status: ${policy.status}`);

  // End the document (this triggers the "end" event and finalizes the PDF)
  doc.end();

  // Ensure that we correctly concatenate the buffer
  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const fullPdfBuffer = Buffer.concat(buffers);
      if (fullPdfBuffer.length === 0) {
        reject("Generated PDF buffer is empty.");
      } else {
        resolve(fullPdfBuffer);
      }
    });
  });
};

//claim submitted pdf
export const generateClaimPDF = async (claim, user) => {
    const doc = new PDFDocument();
  
  //   console.log(policy,user)
  
    const buffers = [];
    doc.on("data", (chunk) => {
      buffers.push(chunk); // Collect the data chunks
    });
  
    doc.on("end", () => {
      console.log('PDF document generation completed.');
    });
  
    // Add some basic content to the PDF
    doc.fontSize(16).text(`U-Insure`, { align: "center" });
    doc.fontSize(16).text(`Claim Details`, { align: "left" });
    doc.moveDown();
    doc.text(`Policy Holder: ${user.fullname}`);
    doc.text(`Policy Type: ${claim.type}`);
    doc.text(`Claim Amount: ${claim.claimAmount}`);
    doc.text(`Claim Reason: ${claim.claimReason}`);
    doc.text(`Policy ID: ${claim.policyId}`);
    doc.text(`Claim ID: ${claim._id}`);
    doc.text(`Status: ${claim.status}`);
  
    // End the document (this triggers the "end" event and finalizes the PDF)
    doc.end();
  
    // Ensure that we correctly concatenate the buffer
    return new Promise((resolve, reject) => {
      doc.on("end", () => {
        const fullPdfBuffer = Buffer.concat(buffers);
        if (fullPdfBuffer.length === 0) {
          reject("Generated PDF buffer is empty.");
        } else {
          resolve(fullPdfBuffer);
        }
      });
    });
  };


