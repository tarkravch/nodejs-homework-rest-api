const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "taras-kravchuk@i.ua" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendMail;
