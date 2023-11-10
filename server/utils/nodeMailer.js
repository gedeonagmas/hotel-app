const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gedeonagmas2580@gmail.com",
      pass: "esvuiygdgxgnjwwp",
    },
  });

  const mailOptions = {
    from: "GYMATE Body Building service <gedeonagmas2580@gmail.com>",
    to: "gedeonagmas2580@gmail.com",
    text: options.message,
    subject: options.subject,
    html: options.html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error);
      return true;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};

module.exports = sendEmail;
