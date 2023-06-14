const VerifyMail = (email, token) => {
  return {
    from: `admin <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Email Verification",
    html: `
        <h1>Email Verification</h1>
        <p>Click this link to verify your email</p>
        <a href="${process.env.CLIENT_URL}/verify/?q=${token}">Verify</a>
      `,
  };
};

module.exports = { VerifyMail };
