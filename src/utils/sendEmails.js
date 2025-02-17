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

const sendEmail = async (to, subject, text, html) => {
    try {
      const msg = {
        to,
        from: process.env.FROM_EMAIL,
        subject,
        text,
        html,
      };
  
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email sending failed");
    }
  };

  //forget email
   export const sendPasswordResetEmail = async (email, resetToken) => {
    const resetUrl = `https://yourdomain.com/reset-password?token=${resetToken}`;
    const text = `To reset your password, click on the link below:\n\n${resetUrl}`;
    const html = `<p>To reset your password, click on the link below:</p><a href="${resetUrl}">Reset Password</a>`;
  
    await sendEmail(email, 'Password Reset Request', text, html);
  };
  
        

