import transporter from "../config/email.js";

const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: %s", info.messageId);
  return info;
};

export default sendMail;
