import sgMail from '@sendgrid/mail';


sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API Key

export const sendDemoEmail = async () => {
  const msg = {
    to: 'kants6397@gmail.com', // Replace with your email
    from: 'shivakant52@nitmanipur.ac.in', // Replace with your SendGrid verified email
    subject: 'Test Email from SendGrid',
    text: 'This is a test email sent via SendGrid.',
    html: '<strong>This is a test email sent via SendGrid.</strong>',
  };

  try {
    await sgMail.send(msg);
    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendEmail = async (to, subject, text, html,attachments = []) => {
    try {
      const msg = {
        to,
        from: process.env.FROM_EMAIL,
        subject,
        text,
        html,
        attachments
      };
  
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email sending failed");
    }
  };

  //forget email
   export const sendPasswordResetEmail = async (email, resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const text = `To reset your password, click on the link below:\n\n${resetUrl}`;
    const html = `<p>To reset your password, click on the link below:</p><a href="${resetUrl}">Reset Password</a>`;
  
    await sendEmail(email, 'Password Reset Request', text, html);
  };

  // purchase policy details
  export const sendPolicyDetailsEmail=async (email,pdfBuffer)=>{
    const text = "Thank you for purchasing the policy. Attached is your policy document.";
    const html = "<p>Thank you for purchasing the policy. Attached is your policy document.</p>";

      const attachments= [
        {
          filename: "policy-details.pdf",
          content: pdfBuffer.toString("base64"), // Convert the buffer to base64 for email attachment
          encoding: "base64",
  }];

  await sendEmail(email,"Policy Purchased Successfully",text,html,attachments)
}

  
        

