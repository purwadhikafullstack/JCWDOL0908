const fs = require("fs");
const path = require("path");

/**
 * This function is used to send email template for verification
 * @param email, token
 * @returns {{subject: string, from: string, html: string, to}}
 */
const VerifyMail = (email, token) => {
  const template = fs.readFileSync(path.join(__dirname, "../mail/register.html"), "utf-8");
  const verifyLink = `${process.env.CLIENT_URL}/verify/?q=${token}`;
  const updatedTemplate = template.replace(/{{verificationLink}}/g, verifyLink);

  return {
    from: `admin <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Email Verification",
    html: updatedTemplate,
  };
};

const resetPassword = (email, token) => {
  const template = fs.readFileSync(path.join(__dirname, "../mail/forgotMail.html"), "utf-8");
  const verifyLink = `${process.env.CLIENT_URL}/reset-password/?q=${token}`;
  const updatedTemplate = template.replace(/{{verificationLink}}/g, verifyLink);

  return {
    from: `admin <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Reset Password",
    html: updatedTemplate,
  };
};

module.exports = { VerifyMail, resetPassword };
